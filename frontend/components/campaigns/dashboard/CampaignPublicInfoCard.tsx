import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaidIcon from '@mui/icons-material/Paid';
import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import { useRouter } from 'next/router';
import {
  campaignImageSx,
  campaignInfoCardHeaderSx,
  campaignInfoItemSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { getCampaignStatus } from '../../../utils/campaigns';
import Button from '../../generic/Button';
import CampaignDateInfoIcon from './CampaignDateInfoIcon';
import CampaignMoneyInfoIcon from './CampaignMoneyInfoIcon';

interface Props {
  campaign: CampaignPublicData;
}

const CampaignPublicInfoCard = ({ campaign }: Props) => {
  const router = useRouter();

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numOfDaysTillEnd = campaign.end.diff(moment(), 'days');

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={campaignImageSx} component="img" src={campaign.imageBase64} />
      </Grid>

      <Grid item xs={12} md={6} marginTop={1}>
        <Stack component="div" spacing={1}>
          <Stack sx={campaignInfoCardHeaderSx} component="div" direction="row">
            <Typography variant="h1">{campaign.name}</Typography>
          </Stack>

          <Typography variant="body2">{campaign.description}</Typography>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">Status: {getCampaignStatus(campaign.start, campaign.end)}</Typography>

            <Stack component="div" direction="row" spacing={2}>
              <CampaignDateInfoIcon label="Start" date={campaign.start} />

              <LinearScaleIcon fontSize="large" />

              <CampaignDateInfoIcon label="End" date={campaign.end} />
            </Stack>

            <Typography variant="h4">
              Campaign ends in {numOfDaysTillEnd} {numOfDaysTillEnd === 1 ? 'day' : 'days'}!
            </Typography>
          </Stack>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">{`${numTotalCoupons} coupons in total`}</Typography>

            <Stack component="div" direction="row" spacing={2}>
              <CampaignMoneyInfoIcon
                tooltipTitle="Promised Amount"
                icon={<PaidIcon fontSize="large" />}
                text={`$${campaign.promisedAmount} in total`}
              />

              <CampaignMoneyInfoIcon
                tooltipTitle="Coupon Denomination"
                icon={<LocalActivityIcon fontSize="large" />}
                text={`$${campaign.couponDenomination} each`}
              />
            </Stack>
          </Stack>

          <Button
            actionType="primary"
            onClick={() => {
              router.push(`/campaigns/${campaign.id}/contribute`);
            }}
          >
            Contribute
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CampaignPublicInfoCard;
