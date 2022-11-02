import { Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CampaignPublicData } from '../../../types/campaigns';
import Button from '../../generic/Button';

interface Props {
  open: boolean;
  campaign: CampaignPublicData;
  setIsCouponHelpOpen: (isOpen: boolean) => void;
}

const CouponHelpDialog = ({ open, campaign, setIsCouponHelpOpen }: Props) => {
  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;

  return (
    <Dialog open={open} onClose={() => setIsCouponHelpOpen(false)}>
      <DialogTitle>
        <Typography variant="h1">More about coupon distribution</Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1}>
          <Typography>
            {campaign.primaryDonor.name} has promised to donate <strong>${campaign.promisedAmount}</strong> as part of
            this campaign. The total amount has been split into coupons of{' '}
            <strong>${campaign.couponDenomination} each</strong>.
          </Typography>

          <Typography>
            <strong>{numTotalCoupons} coupons</strong> was given out to the public as part of the {campaign.name}{' '}
            campaign.
          </Typography>

          <Typography>
            Coupon recipients{' '}
            <strong>
              can choose which charity to donate the ${campaign.couponDenomination} to and they will have a chance to
              make a personal contribution
            </strong>{' '}
            if they wish.
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
