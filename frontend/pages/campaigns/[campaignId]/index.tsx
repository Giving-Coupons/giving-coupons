import { Container, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { isInteger } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
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
import { containerSx, desktopStackSx, swiperSlideSx, swiperSx } from '../../../styles/campaigns/detailStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { Nullable } from '../../../types/utils';
import { getCampaignStatus } from '../../../utils/campaigns';
import NotFound from '../../404';

export default function CampaignDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
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
  const campaignStatus = getCampaignStatus(campaign.start, campaign.end);
  const campaignIsUpcoming = campaignStatus === 'Upcoming';
  const campaignHasEnded = campaignStatus === 'Completed';

  const getPromisedAmountStatsCardChild = (): ReactNode => {
    if (campaignHasEnded) {
      return (
        <Typography variant="h4">
          was sponsored by {campaign.primaryDonor.name}. This will be donated to{' '}
          <strong>
            {campaign.charities.length} {campaign.charities.length === 1 ? 'charity' : 'charities'}
          </strong>
          {campaign.charities.length === 1
            ? '.'
            : ' according to the redemption distribution shown under the charities section.'}
        </Typography>
      );
    }

    return (
      <Typography variant="h4">
        was sponsored by {campaign.primaryDonor.name}. This will be donated to{' '}
        <strong>
          {campaign.charities.length} {campaign.charities.length === 1 ? 'charity' : 'charities'}
        </strong>{' '}
        when the campaign ends.
      </Typography>
    );
  };

  const getDonationAmountStatsCardChild = (): ReactNode => {
    if (campaignIsUpcoming) {
      return (
        <Typography variant="h4">
          was donated by the public. <strong>Be the first to donate when the campaign starts!</strong>
        </Typography>
      );
    }

    if (campaignHasEnded && campaign.donations.secondaryDonation.amount === 0) {
      return (
        <Typography variant="h4">
          was donated by the public. Unfortunately, no personal contributions were made. However, the sponsored amount
          will still be donated!
        </Typography>
      );
    }

    if (campaignHasEnded && campaign.donations.secondaryDonation.amount !== 0) {
      return (
        <Typography variant="h4">
          was donated by the public. <strong>We thank everyone who have donated!</strong>
        </Typography>
      );
    }

    if (campaign.donations.secondaryDonation.amount === 0) {
      return (
        <Typography variant="h4">
          was donated by the public. <strong>Be the first to donate!</strong> Click the contribute button above to make
          a donation.
        </Typography>
      );
    }

    return (
      <Typography variant="h4">
        was donated by the public. That makes up{' '}
        <strong>{Math.round((campaign.donations.secondaryDonation.fraction ?? 0) * 100)}%</strong> of the total donated
        amount!
      </Typography>
    );
  };

  const getNumCouponsRedeemedStatsCardChild = (): ReactNode => {
    if (campaignIsUpcoming) {
      return (
        <Typography variant="h4">
          coupons have been redeemed. Let&apos;s wait for the first coupon to be redeemed once the campaign starts!
        </Typography>
      );
    }

    if (campaignHasEnded) {
      return (
        <Typography variant="h4">
          coupons have been redeemed. <strong>Thank you for redeeming</strong> and helping us changing the way we give
          and build a city of good!
        </Typography>
      );
    }

    if (numCouponsRedeemed === 0) {
      return (
        <Typography variant="h4">
          coupons have been redeemed. Let&apos;s wait for the first coupon to be redeemed!
        </Typography>
      );
    }

    if (numCouponsRedeemed === numTotalCoupons) {
      return (
        <Typography variant="h4">
          coupons have been redeemed! You can still donate to the campaign if you wish to by clicking the contribute
          button above.
        </Typography>
      );
    }

    return (
      <Typography variant="h4">
        coupons were redeemed! This means <strong>{numCouponsRedeemed} more people are aware</strong> about the{' '}
        {campaign.charities.length} charities and their causes!
      </Typography>
    );
  };

  const statsCardsProps: StatsCardProps[] = [
    {
      title: `$${campaign.promisedAmount}`,
      children: getPromisedAmountStatsCardChild(),
    },
    {
      title: `$${campaign.donations.secondaryDonation.amount}`,
      children: getDonationAmountStatsCardChild(),
    },
    {
      title: `${numCouponsRedeemed} of ${numTotalCoupons}`,
      children: getNumCouponsRedeemedStatsCardChild(),
    },
  ];

  return (
    <Container sx={containerSx}>
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

        <CampaignCharityOverview campaign={campaign} />
      </Stack>
    </Container>
  );
}
