import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { charityLogoSx } from '../../../styles/components/charities/CampaignCharityCardStyles';
import {
  charityDesktopImageSx,
  charityMobileImageSx,
  dialogActionStackSx,
  dialogContentSx,
  dialogContentTextSx,
  dialogPaperSx,
  dialogTitleSx,
} from '../../../styles/components/charities/CampaignCharityDialogStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import { log } from '../../../utils/analytics';
import Button from '../../generic/Button';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
  open: boolean;
  handleClose: () => void;
}

const CampaignCharityDialog = ({ campaignCharity, open, handleClose }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullScreen={isMobile} open={open} onClose={handleClose} PaperProps={{ sx: !isMobile ? dialogPaperSx : {} }}>
      <DialogTitle sx={dialogTitleSx}>
        <Stack component="div" direction="row" justifyContent="space-between">
          <Stack component="div" direction="row" spacing={2} alignItems="center">
            <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoUrl} />

            <Typography variant="h2">{campaignCharity.charity.name}</Typography>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent sx={dialogContentSx}>
        <Box
          sx={!isMobile ? charityDesktopImageSx : charityMobileImageSx}
          component="img"
          src={campaignCharity.charity.imageUrl}
        />

        <Box sx={dialogContentTextSx}>
          {campaignCharity.charity.description.split('\n').map((paragraph, index) => (
            <Typography gutterBottom key={index}>
              {paragraph}
            </Typography>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Stack direction="column" spacing={1} sx={dialogActionStackSx}>
          <Button actionType="primary" fullWidth onClick={handleClose}>
            Done
          </Button>

          <Button
            actionType="secondary"
            fullWidth
            onClick={() => {
              log('CampaignCharityDialog_visitCharity', {
                campaignCharityId: campaignCharity.id,
                charity: campaignCharity.charity.name,
              });
              window.open(campaignCharity.charity.websiteUrl, '_blank');
            }}
          >
            Visit Charity Website
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignCharityDialog;
