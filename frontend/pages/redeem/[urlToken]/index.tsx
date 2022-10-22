import { Box } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Stack } from '@mui/system';
import RedeemStepper from '../../../components/redeem/RedeemStepper';
import CampaignCharitySelection from '../../../components/redeem/CampaignCharitySelection';
import useSWR from 'swr';
import { Nullable } from '../../../types/utils';
import { CouponRedeemData } from '../../../types/coupons';
import { useRouter } from 'next/router';
import api from '../../../frontendApis';
import { useState } from 'react';

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && typeof router.query.urlToken === 'string' ? router.query.urlToken : null;
  const { data: coupon } = useSWR<Nullable<CouponRedeemData>>([urlToken], (urlToken) =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );

  const [selectedCampaignCharityId, setSelectedCampaignCharityId] = useState<Nullable<number>>(null);

  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container component="main" maxWidth="md">
        <Stack component="div" spacing={2}>
          <RedeemStepper activeStep={0} />

          {coupon && (
            <CampaignCharitySelection
              primaryDonorName={coupon.campaign.primaryDonor.name}
              couponDenomination={coupon.denomination}
              campaignCharities={coupon.charities}
              selectedCampaignCharityId={selectedCampaignCharityId}
              setSelectedCampaignCharityId={setSelectedCampaignCharityId}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Redeem;
