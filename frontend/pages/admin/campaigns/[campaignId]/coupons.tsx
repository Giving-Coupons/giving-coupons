import * as React from 'react';
import { Box } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CouponFrontA from '../../../../components/coupons/CouponFrontA';
import CouponFrontB from '../../../../components/coupons/CouponFrontB';
import CouponBackA from '../../../../components/coupons/CouponBackA';
import CouponBackB from '../../../../components/coupons/CouponBackB';
import api from '../../../../frontendApis';
import CouponsAPI from '../../../../frontendApis/coupons';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { CouponBaseData } from '../../../../types/coupons';
import { Nullable } from '../../../../types/utils';
import { canBecomeInteger } from '../../../../utils/numbers';
// import { ToggleButton, ToggleButtonGroup } from '@mui/material';

// import dynamic from 'next/dynamic';

// const GeneratePDF = dynamic(() => import('../../../../components/coupons/GeneratePDF'), { ssr: false });

const CampaignCoupons = () => {
  useAdminLoginCheck();
  const { query } = useRouter();
  const { data: coupons } = useSWR<Nullable<CouponBaseData[]>>(CouponsAPI.COUPONS_URL, () =>
    canBecomeInteger(query.campaignId)
      ? api.coupons.listCampaignUnredeemed(Number(query.campaignId)).then((r) => r.payload)
      : null,
  );

  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <Box>
      <Head>
        <title>Coupons</title>
      </Head>
      {/* <GeneratePDF html={ref} /> */}
      {/* <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
        <ToggleButton value="frontA">Front A</ToggleButton>
        <ToggleButton value="backA">Back A</ToggleButton>
        <ToggleButton value="frontB">Front B</ToggleButton>
        <ToggleButton value="backB">Back B</ToggleButton>
      </ToggleButtonGroup> */}

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponFrontA key={index} coupon={coupon} />
        ))}
      </Box>

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponBackA key={index} coupon={coupon} />
        ))}
      </Box>

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponFrontB key={index} coupon={coupon} />
        ))}
      </Box>

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponBackB key={index} coupon={coupon} />
        ))}
      </Box>
    </Box>
  );
};

export default CampaignCoupons;
