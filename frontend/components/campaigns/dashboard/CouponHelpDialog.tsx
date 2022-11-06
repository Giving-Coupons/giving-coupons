import { Box, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { givingCouponsInlineLogoSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import Button from '../../generic/Button';
import { useTheme } from '@mui/system';

interface Props {
  open: boolean;
  campaign: CampaignPublicData;
  setIsCouponHelpOpen: (isOpen: boolean) => void;
}

const CouponHelpDialog = ({ open, campaign, setIsCouponHelpOpen }: Props) => {
  const theme = useTheme();
  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;

  return (
    <Dialog open={open} onClose={() => setIsCouponHelpOpen(false)}>
      <DialogTitle>
        <Typography component="div" variant="h1">
          What are coupons?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1}>
          <Typography>Coupons are generated from a sponsor&apos;s donation.</Typography>

          <Typography variant="body2" color={theme.palette.grey[700]}>
            In this campaign, {campaign.primaryDonor.name} has sponsored ${campaign.promisedAmount}.
            <Box sx={givingCouponsInlineLogoSx} component="img" src="/inline-logo.png" /> split the amount into{' '}
            {numTotalCoupons} coupons at ${campaign.couponDenomination} each. The coupons were distributed to the
            public. A coupon recipient can redeem the coupon to choose which charity to donate the $
            {campaign.couponDenomination} to and they can add a personal contribution if they wish.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button fullWidth size="small" actionType="primary" onClick={() => setIsCouponHelpOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CouponHelpDialog;
