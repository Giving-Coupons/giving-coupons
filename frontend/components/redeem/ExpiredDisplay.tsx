import { Stack, Typography } from '@mui/material';
import { Moment } from 'moment';
import router from 'next/router';
import { rootSx } from '../../styles/components/redeem/ExpiredDisplayStyles';
import { log } from '../../utils/analytics';
import { DATE_FORMAT } from '../../utils/constants';
import Button from '../generic/Button';
import RandomKawaii from '../notFound/RandomKawaii';

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
      <Typography variant="subtitle1">{`Unfortunately, the coupon was only valid until ${couponExpiry.format(
        DATE_FORMAT,
      )}.`}</Typography>
      <Typography>{`You may want to reach out to the person who issued you this coupon or contact ${primaryDonorName} directly.`}</Typography>

      <Button
        actionType="primary"
        onClick={() => {
          log("[Redeem] Click 'Contribute without coupon'");
          router.push(`/campaigns/${campaignId}/contribute`);
        }}
      >
        Contribute without coupon
      </Button>

      <Button
        actionType="secondary"
        onClick={() => {
          log("[Redeem] Click 'Go back' button");
          router.back();
        }}
      >
        Back
      </Button>
    </Stack>
  );
}
