import { Stack, Typography } from '@mui/material';
import router from 'next/router';
import { rootSx } from '../../styles/components/redeem/ExpiredDisplayStyles';
import { CouponRedeemData } from '../../types/coupons';
import { log } from '../../utils/analytics';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';
import BoldText from '../generic/BoldText';
import Button from '../generic/Button';
import RandomKawaii from '../RandomKawaii';

type Props = {
  coupon: CouponRedeemData;
};

export default function ExpiredDisplay({ coupon }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy={false} />

      <Typography variant="h1">Uh-oh, the coupon has expired.</Typography>

      <Typography variant="subtitle1">
        Unfortunately, the coupon was only valid until
        <BoldText spaceBefore>{coupon.expiresAt.format(USER_FACING_DATE_FORMAT)}</BoldText>.
      </Typography>

      <Typography variant="subtitle1">
        You may want to reach out to the person who issued you this coupon or contact the sponsor
        <BoldText spaceBefore spaceAfter>
          {coupon.campaign.primaryDonor.name}
        </BoldText>
        directly.
      </Typography>

      <Button
        actionType="primary"
        onClick={() => {
          log('Redeem_clickContributeWithoutCoupon', { couponId: coupon.id });
          router.push(`/campaigns/${coupon.campaignId}/contribute`);
        }}
      >
        Contribute without coupon
      </Button>
    </Stack>
  );
}
