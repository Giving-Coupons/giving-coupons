import { Box } from '@mui/system';
import Coupon from '../../../../components/coupons/Coupon';
import { CouponBaseData } from '../../../../types/coupons';
import useAdminLoginCheck from '../../../../hooks/useAdminLogInCheck';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Nullable } from '../../../../types/utils';
import CouponsAPI from '../../../../frontendApis/coupons';
import { canBecomeInteger } from '../../../../utils/numbers';
import api from '../../../../frontendApis';

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
      {coupons?.map((coupon, index) => (
        <Coupon key={index} coupon={coupon} />
      ))}
    </Box>
  );
};

export default CampaignCoupons;
