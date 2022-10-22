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
import { useRouter } from 'next/router';
import { charityLogoSx } from '../../../styles/components/charities/CampaignCharityCardStyles';
import {
  charityImageSx,
  dialogActionsSx,
  dialogContentSx,
  dialogContentTextSx,
  dialogTitleSx,
} from '../../../styles/components/charities/CampaignCharityDialogStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import Button from '../../generic/Button';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
  open: boolean;
  handleClose: () => void;
}

const CampaignCharityDialog = ({ campaignCharity, open, handleClose }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullScreen={isMobile} maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle sx={dialogTitleSx}>
        <Stack component="div" direction="row" spacing={2} alignItems="center">
          <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

          <Typography variant="h2">{campaignCharity.charity.name}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={dialogContentSx}>
        <Box sx={charityImageSx} component="img" src={campaignCharity.charity.imageBase64} />

        <Typography sx={dialogContentTextSx}>{campaignCharity.charity.description}</Typography>
      </DialogContent>

      <DialogActions sx={dialogActionsSx}>
        <Button
          actionType="mutedWithoutOutline"
          size="small"
          startIcon={<LinkIcon />}
          onClick={() => router.push(campaignCharity.charity.websiteUrl)}
        >
          Vist Page
        </Button>

        <Button actionType="mutedWithoutOutline" size="small" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignCharityDialog;
