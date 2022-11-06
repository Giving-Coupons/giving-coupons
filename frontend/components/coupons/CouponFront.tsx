import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  containerCenterSx,
  containerLeftSx,
  containerRightSx,
  couponContainerSx,
  denominationBSx,
} from '../../styles/components/coupons/couponStyles';
import { CouponBaseData } from '../../types/coupons';

interface Props {
  coupon: CouponBaseData;
}

const CouponFront = ({ coupon }: Props) => {
  return (
    <Stack sx={couponContainerSx} component="div" direction="row">
      <Box sx={containerLeftSx} />
      <Stack sx={containerCenterSx} component="div">
        <Box component="img" src="/logo-full.png" width="40%" />

        <Typography sx={denominationBSx}>${coupon.denomination}</Typography>

        <Typography variant="h3" align="center" fontWeight="700" color="#FF7300">
          {coupon.denomination} SINGAPORE DOLLAR
        </Typography>
      </Stack>

      <Stack sx={containerRightSx} component="div">
        <Typography variant="h6" align="center" marginBottom="8px">
          Kindly Sponsored By:
        </Typography>

        <Box component="img" src="/anon-donor.png" width="40mm" marginBottom="8px" />
      </Stack>
    </Stack>
  );
};

export default CouponFront;
