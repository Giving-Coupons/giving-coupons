import { Box, Container } from '@mui/system';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import CampaignForm, { campaignDefaultInitialValues } from '../../../components/campaigns/form/CampaignForm';
import api from '../../../frontendApis';
import InterestsAPI from '../../../frontendApis/interests';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { CampaignCharityPostData } from '../../../types/campaignCharities';
import { CampaignFormData, CampaignPostData } from '../../../types/campaigns';
import { InterestData } from '../../../types/interest';
import { PrimaryDonorPostData } from '../../../types/primaryDonor';
import { Nullable } from '../../../types/utils';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import { isValidDate } from '../../../utils/dates';
import { canBecomeInteger } from '../../../utils/numbers';

const createCampaignSchema = Yup.object().shape(
  {
    name: Yup.string().required('Campaign name is required.'),
    description: Yup.string().required('Campaign description is required.'),
    promisedAmount: Yup.number()
      .required('Promised amount is required.')
      .typeError('Promised amount must be a number.')
      .integer('Promised amount must be an integer.')
      .positive('Promised amount must be a positive.')
      .min(100, 'Promised amount must be at least $100')
      .when('couponDenomination', (couponDenomination, schema) => {
        return schema.test({
          test: (promisedAmount: number) =>
            canBecomeInteger(promisedAmount) && canBecomeInteger(couponDenomination)
              ? promisedAmount % couponDenomination === 0
              : true,
          message: `Promised amount must be a multiple of $${couponDenomination}.`,
        });
      }),
    couponDenomination: Yup.number()
      .required('Coupon denomination is required.')
      .typeError('Coupon denomination must be a number.')
      .integer('Coupon denomination must be an integer.')
      .positive('Coupon denomination must be a positive.')
      .min(10, 'Coupon denomination must be at least $10')
      .when('promisedAmount', (promisedAmount, schema) => {
        return schema.test({
          test: (couponDenomination: number) =>
            canBecomeInteger(couponDenomination) && canBecomeInteger(promisedAmount)
              ? promisedAmount % couponDenomination === 0
              : true,
          message: `Coupon denomination must be a factor of $${promisedAmount}.`,
        });
      }),
    initialCouponValidity: Yup.number()
      .required('Initial coupon validity is required.')
      .integer('Initial coupon validity must be an integer.')
      .typeError('Initial coupon validity must be a number.'),
    start: Yup.date()
      .required('Start date is required.')
      .typeError('Start date must be a date.')
      .when('end', (endDate, schema) =>
        isValidDate(endDate) ? schema.max(endDate, 'Start date cannot be after End date') : schema,
      ),
    end: Yup.date()
      .required('End date is required.')
      .typeError('End date must be a date.')
      .when('start', (startDate, schema) =>
        isValidDate(startDate) ? schema.min(startDate, 'End date cannot be before Start date') : schema,
      )
      .min(moment().endOf('day'), 'End date cannot be today or in the past.'),
    imageBase64: Yup.string().required('Campaign image is required.'),
    charities: Yup.array()
      .of(
        Yup.object().shape({
          charity: Yup.object()
            .shape({
              id: Yup.number().required('Charity is required'),
            })
            .required('Charity is required'),
          givingSgUrl: Yup.string()
            .required('Giving.sg campaign url is required')
            .url('A valid url including http:// or https:// is required'),
        }),
      )
      .required('At least one charity is required.')
      .min(1, 'At least one charity is required.')
      .max(MAX_NUM_OF_CAMPAIGN_CHARITIES, `There can only be a maximum of ${MAX_NUM_OF_CAMPAIGN_CHARITIES} charities.`),
    primaryDonor: Yup.object({
      name: Yup.string().required('Primary donor name is required.'),
      email: Yup.string()
        .required('Primary donor email is required.')
        .email('Primary donor email is not in the correct form.'),
      imageBase64: Yup.string().required('Avatar is required'),
    }).required('Primary donor is required'),
  },
  [
    ['start', 'end'],
    ['promisedAmount', 'couponDenomination'],
  ],
);

const CampaignCreate = () => {
  useAdminLoginCheck();
  const router = useRouter();
  const { interestId } = router.query;
  const { data: interest } = useSWR<Nullable<InterestData>>(
    `${InterestsAPI.INTERESTS_URL}/getInterest/${interestId}`,
    () => (canBecomeInteger(interestId) ? api.interests.getInterest(Number(interestId)).then((r) => r.payload) : null),
  );
  const [initialValues, setInitialValues] = useState<CampaignFormData>(campaignDefaultInitialValues);

  useEffect(() => {
    if (interest) {
      setInitialValues({
        name: interest.campaignName,
        description: interest.campaignDescription,
        promisedAmount: interest.promisedAmount,
        couponDenomination: campaignDefaultInitialValues.couponDenomination,
        initialCouponValidity: interest.initialCouponValidity,
        start: interest.start,
        end: interest.end,
        charities: interest.charities.map((interestCharity) => ({
          charity: { id: interestCharity.id },
        })),
        primaryDonor: {
          name: interest.donorName,
          email: interest.donorEmail,
          imageBase64: interest.donorImageBase64,
        },
        imageBase64: interest.campaignImageBase64,
      });
    } else {
      // Note: This has to be here otherwise the previous interest values may be shown
      setInitialValues(campaignDefaultInitialValues);
    }
  }, [interest]);

  const handleSubmit = (values: CampaignFormData) => {
    createCampaignSchema
      .validate(values)
      .then((values: Yup.InferType<typeof createCampaignSchema>) => {
        const charitiesPostData: CampaignCharityPostData[] = values.charities.map((charityValue) => {
          return {
            charity: {
              id: charityValue.charity.id,
            },
            givingSgUrl: charityValue.givingSgUrl,
          };
        });
        const primaryDonorPostData: PrimaryDonorPostData = {
          name: values.primaryDonor.name,
          email: values.primaryDonor.email,
          imageBase64: values.primaryDonor.imageBase64,
        };
        const campaignPostData: CampaignPostData = {
          ...values,
          interestId: interest?.id ?? null,
          start: moment(values.start),
          end: moment(values.end),
          charities: charitiesPostData,
          primaryDonor: primaryDonorPostData,
        };

        return api.campaigns.addCampaign(campaignPostData);
      })
      .then(() => {
        router.push('/admin/campaigns');
      });
  };

  return (
    <Box>
      <Head>
        <title>Create Campaign</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <CampaignForm
          title="Create Campaign"
          submitButtonTitle="Create"
          isForEditCampaign={false}
          initialValues={initialValues}
          validationSchema={createCampaignSchema}
          onSubmit={handleSubmit}
        />
      </Container>
    </Box>
  );
};

export default CampaignCreate;
