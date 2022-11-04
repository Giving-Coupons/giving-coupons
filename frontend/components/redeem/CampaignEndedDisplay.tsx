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
  isFromRedemption: boolean;
};

export default function CampaignEndedDisplay({ campaign, isFromRedemption }: Props) {
  return (
    <Stack component="div" spacing={2} sx={rootSx}>
      <RandomKawaii isHappy={false} />

      <Typography variant="h1">Oops, the campaign is already over!</Typography>

      <Typography variant="subtitle1">
        Unfortunately, the campaign
        <BoldText spaceBefore spaceAfter>
          {campaign.name}
        </BoldText>
        ended on
        <BoldText spaceBefore spaceAfter>{`${campaign.end.format(USER_FACING_DATE_FORMAT)}`}</BoldText>
        and you are no longer able to {isFromRedemption ? 'redeem this coupon' : 'contribute to this campaign'}.
      </Typography>

      {isFromRedemption && (
        <Typography variant="subtitle1">
          Fret not, the pledged coupon amount will not go to waste as the sponsor
          <BoldText spaceBefore spaceAfter>
            {campaign.primaryDonor.name}
          </BoldText>
          will be donating it to a charity of their choice.
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
