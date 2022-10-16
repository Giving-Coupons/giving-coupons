import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { CouponBaseData } from '../../types/coupons';
import { couponContainerSx, leftSectionSx, rightSectionSx } from '../../styles/components/coupons/couponStyles';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  coupon: CouponBaseData;
}

const Coupon = ({ coupon }: Props) => {
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_CLIENT_URL;
  const redeemUrl = `${websiteUrl}/redeem/${coupon.urlToken}`;

  return (
    <Stack sx={couponContainerSx} component="div" direction="row">
      <Stack sx={leftSectionSx} component="div">
        <Typography fontSize={120} fontWeight={800}>
          ${coupon.denomination}
        </Typography>

        <Typography gutterBottom>Donate ${coupon.denomination} to a charity of your choice for free</Typography>

        <Typography variant="caption">This was kindly sponsored by a donor through Giving Coupons.</Typography>

        <Typography variant="caption">Find out more about how we spread the gift of giving at {websiteUrl}</Typography>
      </Stack>

      <Stack sx={rightSectionSx} component="div" spacing={1}>
        <QRCodeSVG value={redeemUrl} size={112} />

        <Stack component="div">
          <Typography align="center" variant="caption">
            Scan the QR code or go to
          </Typography>

          <Typography align="center" color="primary" variant="caption" fontWeight={600}>
            {redeemUrl}
          </Typography>

          <Typography align="center" variant="caption">
            to donate to a charity today.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Coupon;
