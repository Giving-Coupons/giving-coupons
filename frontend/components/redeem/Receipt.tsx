import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { headerSx, imageSx, stackSx } from '../../styles/components/redeem/ReceiptStyles';
import { CharityListData } from '../../types/charity';
import { CouponSponsorship } from '../../types/primaryDonor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface Props {
  charity: CharityListData;
  couponSponsorship?: CouponSponsorship;
  secondaryDonorAmount: number;
}

const Receipt = ({ charity, couponSponsorship, secondaryDonorAmount }: Props) => {
  return (
    <Stack component="div" sx={stackSx}>
      <Stack margin={2} spacing={1}>
        <Typography variant="h4" sx={headerSx}>
          Choice of Charity
        </Typography>

        <ReceiptItem imageBaseUrl={charity.logoBase64} text={charity.name} />
      </Stack>

      <Divider />

      <Stack margin={2} spacing={1}>
        <Typography variant="h4" sx={headerSx}>
          Donation Amount
        </Typography>

        {couponSponsorship ? (
          <>
            <ReceiptItem
              imageBaseUrl={couponSponsorship.primaryDonor.imageBase64}
              text={`$${couponSponsorship.couponDenomination} from ${couponSponsorship.primaryDonor.name}`}
            />

            <ReceiptItem text={`$${secondaryDonorAmount} from you`} />
          </>
        ) : (
          <Typography variant="h4">${secondaryDonorAmount}</Typography>
        )}
      </Stack>
    </Stack>
  );
};

interface ReceiptItemProps {
  imageBaseUrl?: string;
  text: string;
}

const ReceiptItem = ({ imageBaseUrl, text }: ReceiptItemProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar variant="rounded">
        {imageBaseUrl ? <Box sx={imageSx} component="img" src={imageBaseUrl} /> : <AccountBoxIcon />}
      </Avatar>

      <Typography variant="h4">{text}</Typography>
    </Stack>
  );
};

export default Receipt;
