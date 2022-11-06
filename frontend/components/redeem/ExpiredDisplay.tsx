import { Stack, Typography } from '@mui/material';
import { Moment } from 'moment';
import router from 'next/router';
import { rootSx } from '../../styles/components/redeem/ExpiredDisplayStyles';
import { log } from '../../utils/analytics';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';
import BoldText from '../generic/BoldText';
import Button from '../generic/Button';
import RandomKawaii from '../RandomKawaii';

type Props = {
  couponExpiry: Moment;
  primaryDonorName: string;
  campaignId: number;
};

export default function ExpiredDisplay({ couponExpiry, primaryDonorName, campaignId }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy={false} />

      <Typography variant="h1">Uh-oh, the coupon has expired.</Typography>

      <Typography variant="subtitle1">
        Unfortunately, the coupon was only valid until
        <BoldText spaceBefore>{couponExpiry.format(USER_FACING_DATE_FORMAT)}</BoldText>.
      </Typography>

      <Typography variant="subtitle1">
        You may want to reach out to the person who issued you this coupon or contact the sponsor
        <BoldText spaceBefore spaceAfter>
          {primaryDonorName}
        </BoldText>
        directly.
      </Typography>

      <Button
        actionType="primary"
        onClick={() => {
          log('Redeem_clickContributeWithoutCoupon');
          router.push(`/campaigns/${campaignId}/contribute`);
        }}
      >
        Contribute without coupon
      </Button>
    </Stack>
  );
}
