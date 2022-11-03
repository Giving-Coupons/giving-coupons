import { Box, Stack, Typography } from '@mui/material';
import router from 'next/router';
import { boldSx, rootSx } from '../../styles/components/redeem/CampaignEndedDisplayStyles';
import { CampaignBaseData } from '../../types/campaigns';
import { log } from '../../utils/analytics';
import { DATE_FORMAT } from '../../utils/constants';
import Button from '../generic/Button';
import RandomKawaii from '../notFound/RandomKawaii';

type Props = {
  campaign: CampaignBaseData;
  isFromRedemption: boolean;
};

export default function CampaignEndedDisplay({ campaign, isFromRedemption }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy={false} />

      <Typography variant="h1">Oops, the campaign is already over!</Typography>

      <Typography variant="subtitle1">
        {'Unfortunately, the campaign ended on '}
        <Box component="span" sx={boldSx}>
          {`${campaign.end.format(DATE_FORMAT)}`}
        </Box>
        {` and you are no longer able to ${isFromRedemption ? 'redeem this coupon' : 'contribute to this campaign'}.`}
      </Typography>

      {isFromRedemption && (
        <Typography variant="subtitle1">
          {'Fret not, the pledged coupon amount will not go to waste as '}

          <Box component="span" sx={boldSx}>
            {`${campaign.primaryDonor.name}`}
          </Box>

          {' will be donating it to a charity of their choice.'}
        </Typography>
      )}

      <Button
        actionType="primary"
        onClick={() => {
          log("[CampaignEndedDisplay] Click 'View Campaign'");
          router.push(`/campaigns/${campaign.id}`);
        }}
      >
        View Campaign Statistics
      </Button>

      <Button
        actionType="secondary"
        onClick={() => {
          log("[CampaignEndedDisplay] Click 'View Others'");
          router.push(`/campaigns`);
        }}
      >
        Browse Active Campaigns
      </Button>
    </Stack>
  );
}
