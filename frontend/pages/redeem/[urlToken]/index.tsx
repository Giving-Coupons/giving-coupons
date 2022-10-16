import { Box } from '@mui/material';
import { isString } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import CampaignCharitySelection from '../../../components/redeem/CampaignCharitySelection';
import PersonalContribution from '../../../components/redeem/PersonalContribution';
import RedeemLoading from '../../../components/redeem/RedeemLoading';
import api from '../../../frontendApis';
import { CouponRedeemData } from '../../../types/coupons';
import { SecondaryDonationPostData } from '../../../types/donations';
import { Nullable } from '../../../types/utils';
import { Container } from '@mui/system';

const INITIAL_REDEEM_PAGE = 1;
const NUMBER_OF_REDEEM_PAGES = 2;

const Redeem: NextPage = () => {
  const router = useRouter();
  const urlToken = router.query.urlToken && isString(router.query.urlToken) ? router.query.urlToken : null;
  const { data: coupon, error } = useSWR<Nullable<CouponRedeemData>>([urlToken], (urlToken) =>
    urlToken !== null ? api.coupons.getCoupon(urlToken).then((r) => r.payload) : null,
  );

  const isLoading = !coupon && !error;
  const [campaignCharityId, setCampaignCharityId] = useState<Nullable<number>>(null);
  const [redeemPageIndex, setRedeemPageIndex] = useState<number>(INITIAL_REDEEM_PAGE);

  const handleSubmit = (amount: number) => {
    if (campaignCharityId === null) {
      return;
    }

    const secondaryDonationPostData: SecondaryDonationPostData = {
      amount,
      campaignCharityId,
      urlToken,
    };

    api.secondaryDonations.addSecondaryDonation(secondaryDonationPostData).then(() => router.push('/redeem/thank-you'));
  };

  const renderRedeemPage = () => {
    if (isLoading) {
      return <RedeemLoading />;
    }

    if (!coupon) {
      router.push('/');
      return null;
    }

    switch (redeemPageIndex) {
      case 1:
        return (
          <CampaignCharitySelection
            coupon={coupon}
            campaignCharityId={campaignCharityId}
            setCampaignCharityId={setCampaignCharityId}
            goToNextPage={() => setRedeemPageIndex((prev) => Math.min(prev + 1, NUMBER_OF_REDEEM_PAGES))}
          />
        );
      case 2:
        return (
          <PersonalContribution
            coupon={coupon}
            campaignCharityId={campaignCharityId}
            goToPreviousPage={() => setRedeemPageIndex((prev) => Math.max(prev - 1, INITIAL_REDEEM_PAGE))}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container component="main">{renderRedeemPage()}</Container>
    </Box>
  );
};

export default Redeem;
