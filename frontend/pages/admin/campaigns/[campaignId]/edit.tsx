import { Box, Container } from '@mui/system';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import CampaignForm, { campaignDefaultInitialValues } from '../../../../components/campaigns/form/CampaignForm';
import api from '../../../../frontendApis';
import CampaignsAPI from '../../../../frontendApis/campaigns';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { CampaignCharityBaseData } from '../../../../types/campaignCharities';
import { CampaignAdminData, CampaignFormData, CampaignPutData } from '../../../../types/campaigns';
import { PrimaryDonorData } from '../../../../types/primaryDonor';
import { Nullable } from '../../../../types/utils';
import { MAX_NUM_OF_CAMPAIGN_CHARITIES } from '../../../../utils/constants';
import { isValidDate } from '../../../../utils/dates';
import { canBecomeInteger } from '../../../../utils/numbers';

const editCampaignSchema = Yup.object().shape(
  {
    name: Yup.string().required('Campaign name is required.'),
    description: Yup.string().required('Campaign description is required.'),
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
      ),
    imageUrl: Yup.string().required('Campaign image is required.'),
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
      id: Yup.number().required(),
      name: Yup.string().required('Primary donor name is required.'),
      email: Yup.string()
        .required('Primary donor email is required.')
        .email('Primary donor email is not in the correct form.'),
      imageUrl: Yup.string().required('Avatar is required.'),
    }).required('Primary donor is required'),
  },
  [['start', 'end']],
);

const CampaignEdit = () => {
  useAdminLoginCheck();
  const router = useRouter();

  const { query } = router;
  const campaignId = canBecomeInteger(query.campaignId) ? Number(query.campaignId) : null;
  const { data: campaign } = useSWR<Nullable<CampaignAdminData>>(
    `${CampaignsAPI.CAMPAIGNS_URL}/adminGet/${campaignId}`,
    () => (campaignId !== null ? api.campaigns.adminGet(campaignId).then((res) => res.payload) : null),
  );
  const [initialValues, setInitialValues] = useState<CampaignFormData>(campaignDefaultInitialValues);

  useEffect(() => {
    if (campaign) {
      setInitialValues({
        name: campaign.name,
        description: campaign.description,
        start: campaign.start,
        end: campaign.end,
        imageUrl: campaign.imageUrl,
        charities: campaign.charities.map((campaignCharities) => ({
          id: campaignCharities.id,
          charity: {
            id: campaignCharities.charity.id,
          },
          givingSgUrl: campaignCharities.givingSgUrl,
        })),
        primaryDonor: campaign.primaryDonor,
      });
    } else {
      setInitialValues(campaignDefaultInitialValues);
    }
  }, [campaign]);

  const handleSubmit = (values: CampaignFormData) => {
    if (campaignId === null) {
      // This should never be available as useSWR will set error / loading and form will not be visible. (Defensive)
      return Promise.reject('Campaign ID is not an integer.');
    }

    editCampaignSchema
      .validate(values)
      .then((values: Yup.InferType<typeof editCampaignSchema>) => {
        const charitiesPutData: CampaignCharityBaseData[] = values.charities.map((charityValue) => {
          return {
            id: charityValue.id,
            charity: {
              id: charityValue.charity.id,
            },
            givingSgUrl: charityValue.givingSgUrl,
          };
        });
        const primaryDonorPutData: PrimaryDonorData = {
          id: values.primaryDonor.id,
          name: values.primaryDonor.name,
          email: values.primaryDonor.email,
          imageUrl: values.primaryDonor.imageUrl,
        };
        const campaignPutData: CampaignPutData = {
          ...values,
          charities: charitiesPutData,
          interestId: campaign?.interestId ?? null,
          start: moment(values.start),
          end: moment(values.end).endOf('day'),
          primaryDonor: primaryDonorPutData,
        };

        return api.campaigns.putCampaign(campaignId, campaignPutData);
      })
      .then(() => {
        canBecomeInteger(campaignId) ? router.push(`/admin/campaigns/${campaignId}`) : router.push('/admin/campaigns');
      });
  };

  return (
    <Box>
      <Head>
        <title>Edit Campaign</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <CampaignForm
          title="Edit Campaign"
          submitButtonTitle="Save"
          isForEditCampaign
          initialValues={initialValues}
          validationSchema={editCampaignSchema}
          onSubmit={handleSubmit}
        />
      </Container>
    </Box>
  );
};

export default CampaignEdit;
