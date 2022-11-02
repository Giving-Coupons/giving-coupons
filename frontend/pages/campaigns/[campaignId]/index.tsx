import { Container, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { isInteger } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import CampaignCharityOverview from '../../../components/campaigns/campaignCharities/CampaignCharityOverview';
import CampaignDetailLoading from '../../../components/campaigns/dashboard/CampaignDetailLoading';
import CampaignPublicInfoCard from '../../../components/campaigns/dashboard/CampaignPublicInfoCard';
import StatsCard, { StatsCardProps } from '../../../components/StatsCard';
import api from '../../../frontendApis';
import { desktopStackSx, swiperSlideSx, swiperSx } from '../../../styles/campaigns/detailStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { Nullable } from '../../../types/utils';
import NotFound from '../../404';

export default function CampaignDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const campaignId =
    router.query.campaignId && isInteger(router.query.campaignId) ? Number(router.query.campaignId) : null;

  const { data: campaign, error } = useSWR<Nullable<CampaignPublicData>>([campaignId], (campaignId) =>
    campaignId !== null ? api.campaigns.getCampaign(campaignId).then((res) => res.payload) : null,
  );

  const isLoading = !campaign && !error;

  if (isLoading) {
    return <CampaignDetailLoading />;
  }

  if (!campaign) {
    return <NotFound entity="campaign" />;
  }

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numCouponsRedeemed = campaign.donations.primaryDonation.amount / campaign.couponDenomination;

  const statsCardsProps: StatsCardProps[] = [
    {
      title: `$${campaign.promisedAmount}`,
      children: (
        <Typography variant="h4">
          will be donated to <strong>{campaign.charities.length} charities</strong> when the campaign ends. This was
          sponsored by {campaign.primaryDonor.name}.
        </Typography>
      ),
    },
    {
      title: `$${campaign.donations.secondaryDonation.amount}`,
      children: (
        <Typography variant="h4">
          extra donations were generated by the public. That makes up{' '}
          <strong>{Math.round((campaign.donations.secondaryDonation.fraction ?? 0) * 100)}%</strong> of the total
          donated amount!
        </Typography>
      ),
    },
    {
      title: `${numCouponsRedeemed} of ${numTotalCoupons}`,
      children: (
        <Typography variant="h4">
          coupons were redeemed! This means <strong>{numCouponsRedeemed} more people are aware</strong> about the{' '}
          {campaign.charities.length} charaties and their causes!
        </Typography>
      ),
    },
  ];

  return (
    <Container>
      <Head>
        <title>{campaign.name}</title>
      </Head>

      <Stack spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Stack spacing={3} sx={isMobile ? {} : desktopStackSx}>
          <CampaignPublicInfoCard campaign={campaign} />

          <Divider />

          {!isMobile && (
            <Stack direction="row" spacing={3}>
              {statsCardsProps.map((statsCardsProp, index) => (
                <StatsCard key={index} {...statsCardsProp} />
              ))}
            </Stack>
          )}

          {isMobile && (
            <Swiper
              style={swiperSx}
              modules={[Pagination, Autoplay]}
              pagination
              slidesPerView={1}
              loop
              autoplay={{
                delay: 8000,
              }}
            >
              {statsCardsProps.map((statsCardsProp, index) => (
                <SwiperSlide key={index} style={swiperSlideSx}>
                  <StatsCard {...statsCardsProp} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Stack>

        <Divider />

        <CampaignCharityOverview campaignCharities={campaign.charities} />
      </Stack>
    </Container>
  );
}
