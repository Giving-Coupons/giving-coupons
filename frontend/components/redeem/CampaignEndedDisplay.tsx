import { Stack, Typography } from '@mui/material';
import router from 'next/router';
import { buttonSx, rootSx } from '../../styles/components/redeem/CampaignEndedDisplayStyles';
import { CampaignBaseData } from '../../types/campaigns';
import { log } from '../../utils/analytics';
import { USER_FACING_DATE_FORMAT } from '../../utils/constants';
import BoldText from '../generic/BoldText';
import Button from '../generic/Button';
import RandomKawaii from '../RandomKawaii';

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

      <Stack spacing={2}>
        <Button
          actionType="primary"
          onClick={() => {
            log("[CampaignEndedDisplay] Click 'View Campaign'", { campaignId: campaign.id });
            router.push(`/campaigns/${campaign.id}`);
          }}
          sx={buttonSx}
        >
          View Campaign Statistics
        </Button>

        <Button
          actionType="secondary"
          onClick={() => {
            log("[CampaignEndedDisplay] Click 'View Others'", { campaignId: campaign.id });
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
