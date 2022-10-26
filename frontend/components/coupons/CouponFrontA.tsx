import { Stack } from '@mui/system';
import { Typography, Box } from '@mui/material';
import {
  couponContainerSx,
  leftSectionSx,
  rightSectionSx,
  denominationSx,
  logoSx,
  sponsorLogoSx,
} from '../../styles/components/coupons/couponStyles';
import { CouponBaseData } from '../../types/coupons';

interface Props {
  coupon: CouponBaseData;
}

const CouponFrontA = ({ coupon }: Props) => {
  return (
    <Stack sx={couponContainerSx} component="div" direction="row">
      <Stack sx={leftSectionSx} component="div">
        <Box sx={logoSx} component="img" src="/logo-font.png" />

        <Typography variant="caption" align="center" fontWeight="500">
          Here is ${coupon.denomination} for you to give to a charity of your choice.
        </Typography>

        <Typography variant="h5" marginTop="16px">
          Kindly Sponsored By:
        </Typography>

        <Box sx={sponsorLogoSx} component="img" src="/logo-soc.png" />
      </Stack>

      <Stack sx={rightSectionSx} component="div" spacing={1}>
        <Typography sx={denominationSx}>${coupon.denomination}</Typography>
      </Stack>
    </Stack>
  );
};

export default CouponFrontA;
