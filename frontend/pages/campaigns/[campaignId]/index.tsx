import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { isInteger } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CampaignCharityCard from '../../../components/campaigns/campaignCharities/CampaignCharityCard';
import CampaignCharityList from '../../../components/campaigns/campaignCharities/CampaignCharityList';
import CampaignDescription from '../../../components/campaigns/CampaignDescription';
import CampaignLoading from '../../../components/campaigns/dashboard/CampaignLoading';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel';
import SwiperWrapper from '../../../components/swiper/SwiperWrapper';
import api from '../../../frontendApis';
import { CampaignPublicData } from '../../../types/campaigns';
import { Nullable } from '../../../types/utils';
import { theme } from '../../../utils/theme';
import NotFound from '../../404';

export default function CampaignDetail() {
  const router = useRouter();
  const campaignId =
    router.query.campaignId && isInteger(router.query.campaignId) ? Number(router.query.campaignId) : null;

  const { data: campaign, error } = useSWR<Nullable<CampaignPublicData>>([campaignId], (campaignId) =>
    campaignId !== null ? api.campaigns.getCampaign(campaignId).then((res) => res.payload) : null,
  );

  const isLoading = !campaign && !error;

  if (isLoading) {
    // TODO: Replace skeleton
    return <CampaignLoading />;
  }

  if (!campaign) {
    return <NotFound entity="campaign" />;
  }

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numCouponsRedeemed = campaign.donations.primaryDonation.amount / campaign.couponDenomination;

  return (
    <Container sx={{ padding: theme.spacing(2) }}>
      <Head>
        <title>{campaign.name}</title>
      </Head>

      <Typography variant="h1">{campaign.name}</Typography>

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
              <Button variant="contained" onClick={() => router.push(`/campaigns/${campaignId}/contribute`)}>
                Contribute
              </Button>
            </Stack>
          }
        />
      </Stack>
    </Container>
  );
}
