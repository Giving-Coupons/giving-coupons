import { Stack, Typography } from '@mui/material';
import router from 'next/router';
import { buttonSx, rootSx } from '../../styles/components/redeem/CampaignNotStartedDisplayStyles';
import { CampaignBaseData } from '../../types/campaigns';
import { log } from '../../utils/analytics';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';
import BoldText from '../generic/BoldText';
import Button from '../generic/Button';
import RandomKawaii from '../RandomKawaii';

type Props = {
  campaign: CampaignBaseData;
};

export default function CampaignNotStartedDisplay({ campaign }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy />

      <Typography variant="h1">Wait, the campaign has not begun!</Typography>

      <Typography variant="subtitle1">
        The campaign
        <BoldText spaceBefore spaceAfter>
          {campaign.name}
        </BoldText>
        will only start on
        <BoldText spaceBefore>{`${campaign.end.format(USER_FACING_DATE_FORMAT)}`}</BoldText>.
      </Typography>

      <Typography variant="subtitle1">Sit tight, we are just as excited as you are!</Typography>

      <Stack spacing={2}>
        <Button
          actionType="primary"
          onClick={() => {
            log('CampaignNotStartedDisplay_clickViewCampaign');
            router.push(`/campaigns/${campaign.id}`);
          }}
          sx={buttonSx}
        >
          View Campaign
        </Button>

        <Button
          actionType="secondary"
          onClick={() => {
            log('CampaignNotStartedDisplay_clickViewActive');
            router.push(`/campaigns`);
          }}
          sx={buttonSx}
        >
          Browse Active Campaigns
        </Button>
      </Stack>
    </Stack>
  );
}
