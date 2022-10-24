import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LinkIcon from '@mui/icons-material/Link';
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
  charityImageSx,
  dialogContentSx,
  dialogContentTextSx,
  dialogPaperSx,
  dialogTitleSx,
} from '../../../styles/components/charities/CampaignCharityDialogStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import Button from '../../generic/Button';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
  open: boolean;
  handleClose: () => void;
}

const CampaignCharityDialog = ({ campaignCharity, open, handleClose }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullScreen={isMobile} maxWidth="md" open={open} onClose={handleClose} PaperProps={{ sx: dialogPaperSx }}>
      <DialogTitle sx={dialogTitleSx}>
        <Stack component="div" direction="row" justifyContent="space-between">
          <Stack component="div" direction="row" spacing={2} alignItems="center">
            <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

            <Typography variant="h2">{campaignCharity.charity.name}</Typography>
          </Stack>

          <IconButtonWithTooltip icon={<HighlightOffIcon />} tooltip="Close" onClick={handleClose} />
        </Stack>
      </DialogTitle>

      <DialogContent sx={dialogContentSx}>
        <Box sx={charityImageSx} component="img" src={campaignCharity.charity.imageBase64} />

        <Typography sx={dialogContentTextSx}>{campaignCharity.charity.description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button
          actionType="secondary"
          fullWidth
          startIcon={<LinkIcon />}
          onClick={() => window.open(campaignCharity.charity.websiteUrl, '_blank')}
        >
          Vist Page
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignCharityDialog;
