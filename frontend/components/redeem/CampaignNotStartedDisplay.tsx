import { Stack, Typography } from '@mui/material';
import router from 'next/router';
import { rootSx } from '../../styles/components/redeem/CampaignEndedDisplayStyles';
import { CampaignBaseData } from '../../types/campaigns';
import { log } from '../../utils/analytics';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';
import BoldText from '../generic/BoldText';
import Button from '../generic/Button';
import RandomKawaii from '../notFound/RandomKawaii';

type Props = {
  campaign: CampaignBaseData;
};

export default function CampaignNotStartedDisplay({ campaign }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy={false} />

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

      <Button
        actionType="primary"
        onClick={() => {
          log("[CampaignNotStartedDisplay] Click 'View Campaign'");
          router.push(`/campaigns/${campaign.id}`);
        }}
      >
        View Campaign
      </Button>

      <Button
        actionType="secondary"
        onClick={() => {
          log("[CampaignNotStartedDisplay] Click 'View Active'");
          router.push(`/campaigns`);
        }}
      >
        Browse Active Campaigns
      </Button>
    </Stack>
  );
}
