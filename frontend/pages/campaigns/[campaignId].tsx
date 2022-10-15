import { useRouter } from 'next/router';
import React from 'react';
import { canBecomeInteger } from '../../utils/numbers';
import CampaignCharityCard from '../../components/charities/CampaignCharityCard';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { theme } from '../../utils/theme';
import { makeMockCampaign } from './mock';
import OpenQuotes from '../../components/icons/OpenQuotes';
import CloseQuotes from '../../components/icons/CloseQuotes';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import SwiperWrapper from '../../components/swiper/SwiperWrapper';
import CampaignCharityList from '../../components/charities/CampaignCharityList';

export default function CampaignDetail() {
  const router = useRouter();

  const campaignId = canBecomeInteger(router.query.campaignId) ? Number(router.query.campaignId) : undefined;

  const campaign = makeMockCampaign(); // TODO: Replace with API call

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numCouponsRedeemed = campaign.donations.primaryDonor.amount / campaign.couponDenomination;

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
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

        <Typography variant="h2">About the campaign</Typography>

        <Typography variant="body1">
          This campaign was started by <strong>{campaign.primaryDonor.name}</strong> who has generously committed
          <strong> ${campaign.promisedAmount}</strong> to the beneficiaries listed above.
        </Typography>

        <OpenQuotes />

        <Typography variant="body1" align="center">
          {campaign.description}
        </Typography>

        <CloseQuotes style={{ alignSelf: 'flex-end' }} />

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
    </Box>
  );
}
