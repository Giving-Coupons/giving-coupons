import { Box, Container } from '@mui/system';
import CampaignForm from '../../../components/campaigns/form/CampaignForm';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../utils/constants';
import { isValidDate } from '../../../utils/dates';
import moment from 'moment';
import { CampaignFormData, CampaignPostData } from '../../../types/campaigns';
import { CampaignCharityPostData } from '../../../types/campaignCharities';
import { PrimaryDonorPostData } from '../../../types/primaryDonor';
import { canBecomeInteger } from '../../../utils/numbers';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Nullable } from '../../../types/utils';
import { Interest } from '../../../types/interest';
import InterestsAPI from '../../../frontendApis/interests';
import api from '../../../frontendApis';
import { isInteger } from 'formik';

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
    start: Yup.date()
      .required('Start date is required.')
      .typeError('Start date must be a date.')
      .when('end', (endDate, schema) =>
        isValidDate(endDate) ? schema.max(endDate, 'Start date cannot be after End date') : schema,
      )
      .min(moment().endOf('day'), 'Start date cannot be today or in the past.'),
    end: Yup.date()
      .required('End date is required.')
      .typeError('End date must be a date.')
      .when('startDate', (startDate, schema) =>
        isValidDate(startDate) ? schema.min(startDate, 'End date cannot be before Start date') : schema,
      )
      .min(moment().endOf('day'), 'End date cannot be today or in the past.'),
    imageBase64: Yup.string().required('Campaign image is required.'),
    interestId: Yup.number().nullable().required(),
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
      email: Yup.string().required('Primary donor email is required.').email('Donor email is not in the correct form.'),
    }).required('Primary donor is required'),
  },
  [
    ['start', 'end'],
    ['promisedAmount', 'couponDenomination'],
  ],
);

const CampaignCreate = () => {
  const router = useRouter();
  const { interestId } = router.query;
  const { data: interest } = useSWR<Nullable<Interest>>(`${InterestsAPI.INTERESTS_URL}/getInterest`, () =>
    isInteger(interestId) ? api.interests.getInterest(Number(interestId)).then((r) => r.payload) : null,
  );
  const [initialValues, setInitialValues] = useState<CampaignFormData>({
    start: null,
    end: null,
    interestId: null,
    charities: [{}],
  });

  useEffect(() => {
    if (interest) {
      setInitialValues({
        name: interest.campaignName,
        description: interest.campaignDescription,
        promisedAmount: interest.promisedAmount,
        start: interest.start,
        end: interest.end,
        interestId: interest.id,
        charities: interest.charities.map((interestCharity) => ({
          charity: { id: interestCharity.id },
        })),
        primaryDonor: {
          name: interest.donorName,
          email: interest.donorEmail,
        },
      });
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
        };
        const campaignPostData: CampaignPostData = {
          ...values,
          charities: charitiesPostData,
          start: moment(values.start).toISOString(),
          end: moment(values.end).toISOString(),
          primaryDonor: primaryDonorPostData,
        };

        // TODO: Replace with API
        console.log(campaignPostData);
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
          initialValues={initialValues}
          validationSchema={createCampaignSchema}
          onSubmit={handleSubmit}
        />
      </Container>
    </Box>
  );
};

export default CampaignCreate;
