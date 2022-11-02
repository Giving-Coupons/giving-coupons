import HelpIcon from '@mui/icons-material/Help';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaidIcon from '@mui/icons-material/Paid';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  campaignImageStackSx,
  campaignImageSx,
  campaignInfoCardHeaderSx,
  campaignInfoItemSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { getCampaignStatus } from '../../../utils/campaigns';
import Button from '../../generic/Button';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';
import CampaignDateInfoIcon from './CampaignDateInfoIcon';
import CampaignMoneyInfoIcon from './CampaignMoneyInfoIcon';
import CouponHelpDialog from './CouponHelpDialog';

interface Props {
  campaign: CampaignPublicData;
}

const CampaignPublicInfoCard = ({ campaign }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [isCouponHelpOpen, setIsCouponHelpOpen] = useState<boolean>(false);

  const numTotalCoupons = campaign.promisedAmount / campaign.couponDenomination;
  const numOfDaysTillEnd = campaign.end.diff(moment(), 'days');

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} marginBottom={1}>
        <Stack sx={campaignInfoCardHeaderSx} component="div" direction="row">
          <Typography variant="h1">{campaign.name}</Typography>
        </Stack>

        <Typography>{campaign.description}</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack justifyContent="center" alignItems="center" sx={campaignImageStackSx}>
          <Box sx={campaignImageSx} component="img" src={campaign.imageBase64} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6} marginTop={isMobile ? 1 : 0}>
        <Stack component="div" spacing={1} justifyContent="center" alignItems="center">
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
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography variant="h4">{`${numTotalCoupons} coupons in total`}</Typography>

              <IconButtonWithTooltip
                icon={<HelpIcon />}
                tooltip="Learn more about coupon distribution"
                onClick={() => setIsCouponHelpOpen(true)}
              />

              {isCouponHelpOpen && <CouponHelpDialog campaign={campaign} setIsCouponHelpOpen={setIsCouponHelpOpen} />}
            </Stack>

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
        </Stack>
      </Grid>

      <Grid item xs={12} marginTop={1}>
        <Button
          fullWidth
          actionType="primary"
          onClick={() => {
            router.push(`/campaigns/${campaign.id}/contribute`);
          }}
        >
          Contribute
        </Button>
      </Grid>
    </Grid>
  );
};

export default CampaignPublicInfoCard;
