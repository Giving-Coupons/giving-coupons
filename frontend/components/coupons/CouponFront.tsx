import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  containerCenterSx,
  containerLeftSx,
  containerRightSx,
  couponContainerSx,
  denominationBSx,
  primaryDonorImageSx,
} from '../../styles/components/coupons/couponStyles';
import { CouponDownloadData } from '../../types/coupons';
interface Props {
  coupon: CouponDownloadData;
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
        <Typography variant="h5" align="center" marginBottom="8px">
          Kindly Sponsored By:
        </Typography>

        <Stack component="div" direction="row" alignItems="center" spacing={2}>
          <Box component="img" src={coupon.primaryDonor.imageUrl} sx={primaryDonorImageSx} />
          <Typography variant="subtitle2">{coupon.primaryDonor.name}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CouponFront;
