import React from 'react';
import { canBecomeInteger } from '../../utils/numbers';
import CampaignCharityCard from '../../components/charities/CampaignCharityCard';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { theme } from '../../utils/theme';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import SwiperWrapper from '../../components/swiper/SwiperWrapper';
import CampaignCharityList from '../../components/charities/CampaignCharityList';
import api from '../../frontendApis';
import { GetServerSidePropsContext } from 'next';
import { CampaignPublicData } from '../../types/campaigns';
import { ApiResponse, StatusMessage } from '../../types/api';
import { Nullable } from '../../types/utils';
import { useSnackbar } from 'notistack';
import { enqueueGCSnackbar } from '../../utils/snackbar';
import CampaignDescription from '../../components/campaigns/CampaignDescription';
import NotFound from '../../components/notFound/NotFound';

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{ props: { campaign: Nullable<CampaignPublicData>; message?: Nullable<StatusMessage> } }> {
  const { campaignId: campaignIdParam } = context.query;

  const campaignId = canBecomeInteger(campaignIdParam) ? Number(campaignIdParam) : undefined;

  if (!campaignId) {
    return {
      props: {
        campaign: null,
      },
    };
  }

  return api.campaigns
    .getCampaign(campaignId)
    .then((response) => ({
      props: {
        campaign: response.payload,
        message: response.message,
      },
    }))
    .catch((error: ApiResponse<null>) => ({ props: { campaign: null, message: error.message } }));
}

type Props = {
  campaign: Nullable<CampaignPublicData>;
  message: Nullable<StatusMessage>;
};

export default function CampaignDetail({ campaign, message }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  enqueueGCSnackbar(enqueueSnackbar, message, { preventDuplicate: true });

  if (!campaign) {
    return <NotFound message="The requested campaign does not exist." />;
  }

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numCouponsRedeemed = campaign.donations.primaryDonor.amount / campaign.couponDenomination;

  return (
    <Container sx={{ padding: theme.spacing(2) }}>
      <Typography variant="h1">Campaign name</Typography>

      <Typography variant="subtitle1" align="center">
        Swipe or click the arrows to see all beneficiaries
      </Typography>

      <SwiperWrapper navigable paginated>
        {campaign.charities.map((campaignCharity, index) => (
          <CampaignCharityCard key={index} campaignCharity={campaignCharity} />
        ))}
      </SwiperWrapper>

      <Stack spacing={2}>
        <Divider />

        <Typography variant="h2">Amount raised by donors so far</Typography>

        <CampaignCharityList campaignCharities={campaign.charities} />

        <Divider />

        <CampaignDescription campaign={campaign} />

        <CircularProgressWithLabel
          size={300}
          color="primary"
          variant="determinate"
          value={(numCouponsRedeemed / numTotalCoupons) * 100}
          label={
            <Stack alignItems="center" spacing={2}>
              <Typography variant="h2">{numCouponsRedeemed}</Typography>
              <Typography variant="h4">{`of ${numTotalCoupons} coupons redeemed.`}</Typography>
              <Button variant="contained">Contribute</Button>
            </Stack>
          }
        />
      </Stack>
    </Container>
  );
}
