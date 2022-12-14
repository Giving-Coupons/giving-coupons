import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { avatarSx, primaryDonorItemSx } from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { PrimaryDonorData } from '../../../types/primaryDonor';
import CampaignCard from './CampaignCard';

interface Props {
  primaryDonor: PrimaryDonorData;
}

const CampaignPrimaryDonorCard = ({ primaryDonor }: Props) => (
  <CampaignCard>
    <Typography variant="h3">Initiated by</Typography>

    <Avatar variant="rounded" sx={avatarSx} src={primaryDonor.imageUrl} />

    <Stack sx={primaryDonorItemSx} component="div" direction="row" spacing={2}>
      <Avatar variant="rounded">
        <AccountBoxIcon />
      </Avatar>

      <Typography>{primaryDonor.name}</Typography>
    </Stack>

    <Stack sx={primaryDonorItemSx} component="div" direction="row" spacing={2}>
      <Avatar variant="rounded">
        <EmailIcon />
      </Avatar>

      <Typography component="a" href={`mailto:${primaryDonor.email}`}>
        {primaryDonor.email}
      </Typography>
    </Stack>
  </CampaignCard>
);

export default CampaignPrimaryDonorCard;
