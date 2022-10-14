import {
  cardSx,
  charityContainerSx,
  charityItemSx,
  logoSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { Avatar, Link as MuiLink, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { CampaignCharityData } from '../../../types/campaignCharities';
import Link from 'next/link';

interface Props {
  campaignCharities: CampaignCharityData[];
}

interface ItemProps {
  campaignCharity: CampaignCharityData;
}

const CampaignCharityItem = ({ campaignCharity }: ItemProps) => (
  <Stack sx={charityContainerSx} component="div" direction="row" spacing={2}>
    <Avatar sx={logoSx} variant="square" src={campaignCharity.charity.logoBase64} />

    <Stack sx={charityItemSx} component="div">
      <Typography variant="h4">{campaignCharity.charity.name}</Typography>

      <MuiLink component={Link} href={campaignCharity.givingSgUrl}>
        <Typography color="info.main">{campaignCharity.givingSgUrl}</Typography>
      </MuiLink>
    </Stack>
  </Stack>
);

const CampaignCharitiesCard = ({ campaignCharities }: Props) => (
  <Stack sx={cardSx} component="div" spacing={2}>
    <Typography variant="h3">Charities Info</Typography>

    {campaignCharities.map((campaignCharity, index) => (
      <CampaignCharityItem key={index} campaignCharity={campaignCharity} />
    ))}
  </Stack>
);

export default CampaignCharitiesCard;
