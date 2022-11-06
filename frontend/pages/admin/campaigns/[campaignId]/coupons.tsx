import { Box } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';
import CouponBack from '../../../../components/coupons/CouponBack';
import CouponFront from '../../../../components/coupons/CouponFront';
import api from '../../../../frontendApis';
import CouponsAPI from '../../../../frontendApis/coupons';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { CouponBaseData } from '../../../../types/coupons';
import { Nullable } from '../../../../types/utils';
import { canBecomeInteger } from '../../../../utils/numbers';

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

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponFront key={index} coupon={coupon} />
        ))}
      </Box>

      <Box component="div" ref={ref}>
        {coupons?.map((coupon, index) => (
          <CouponBack key={index} coupon={coupon} />
        ))}
      </Box>
    </Box>
  );
};

export default CampaignCoupons;
