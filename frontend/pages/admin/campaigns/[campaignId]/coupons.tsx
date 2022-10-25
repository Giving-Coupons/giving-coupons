import { Box } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Coupon from '../../../../components/coupons/Coupon';
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

  return (
    <Box>
      <Head>
        <title>Coupons</title>
      </Head>

      {coupons?.map((coupon, index) => (
        <Coupon key={index} coupon={coupon} />
      ))}
    </Box>
  );
};

export default CampaignCoupons;
