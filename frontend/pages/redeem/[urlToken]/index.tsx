import { Box, Container } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { containerSx } from '../../../styles/redeem/indexStyles';
import { Nullable } from '../../../types/utils';

const INITIAL_REDEEM_PAGE = 1;
const NUMBER_OF_REDEEM_PAGES = 2;

const Redeem: NextPage = () => {
  const router: NextRouter = useRouter();
  const { urlToken } = router.query;

  const [redeemPageIndex, setRedeemPageIndex] = useState<number>(INITIAL_REDEEM_PAGE);

  const goToNextPage = () => {
    setRedeemPageIndex((prev) => Math.min(prev + 1, NUMBER_OF_REDEEM_PAGES));
  };

  const goToPreviousPage = () => {
    setRedeemPageIndex((prev) => Math.max(prev - 1, INITIAL_REDEEM_PAGE));
  };

  const [campaignCharityId, setCampaignCharityId] = useState<Nullable<number>>(null);
  const [amount, setAmount] = useState<number>(0);

  return (
    <Box>
      <Head>
        <title>Redeem</title>
      </Head>

      <Container sx={containerSx} component="main"></Container>
    </Box>
  );
};

export default Redeem;
