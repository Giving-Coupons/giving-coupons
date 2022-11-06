import { Box, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { QRCodeSVG } from 'qrcode.react';
import {
  couponContainerSx,
  instructionsItemSx,
  instructionsListSx,
  instructionsLogoSx,
  instructionsSx,
  qrCodeSx,
} from '../../styles/components/coupons/couponStyles';
import { CouponBaseData } from '../../types/coupons';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';

interface Props {
  coupon: CouponBaseData;
}

const CouponBack = ({ coupon }: Props) => {
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_CLIENT_URL;
  const redeemUrl = `${websiteUrl}/redeem/${coupon.urlToken}`;

  return (
    <Stack sx={couponContainerSx} component="div" direction="row">
      <Stack sx={instructionsSx} component="div">
        <Stack component="div" direction="row" alignItems="center">
          <Box sx={instructionsLogoSx} component="img" src="/logo-icon.png" />

          <Typography variant="h2" color="#FF7300">
            Instructions
          </Typography>
        </Stack>

        <Box sx={instructionsListSx}>
          <Typography sx={instructionsItemSx}>
            1. You are now the recipient of a coupon kindly sponsored by a donor.
          </Typography>

          <Typography sx={instructionsItemSx}>2. Scan the QR code to access the redemption page.</Typography>

          <Typography sx={instructionsItemSx}>
            3. Select a charity or a cause which you would like this money to go towards.
          </Typography>

          <Typography sx={instructionsItemSx}>4. Make a personal contribution if you can.</Typography>

          <Typography sx={instructionsItemSx}>5. Tell your friends about us!</Typography>

          <Box marginTop="16px">
            <Typography variant="h3" color="#00ADEF">
              Giving Coupons is a social impact project part of CS3216
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Stack sx={qrCodeSx} component="div" spacing={1}>
        <QRCodeSVG value={redeemUrl} size={140} />

        <Stack component="div">
          <Typography align="center" color="black" variant="caption" fontWeight={600}>
            {redeemUrl}
          </Typography>

          <Divider />

          <Typography align="center" color="gray" variant="caption" fontWeight={600}>
            {`Valid Till: ${coupon.expiresAt.format(USER_FACING_DATE_FORMAT)}`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CouponBack;
