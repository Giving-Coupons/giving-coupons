import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaidIcon from '@mui/icons-material/Paid';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  campaignDetailImageSx,
  campaignImageStackSx,
  campaignInfoCardHeaderSx,
  campaignInfoItemSx,
  campaignStatusTextSx,
  couponHelpIconButtonSx,
  couponHelpIconSx,
} from '../../../styles/components/campaigns/dashboard/CampaignDashboardStyles';
import { CampaignPublicData } from '../../../types/campaigns';
import { log } from '../../../utils/analytics';
import { getCampaignStatus } from '../../../utils/campaigns';
import { USER_FACING_DATE_FORMAT } from '../../../utils/constants';
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
  const numOfDaysTillEnd = campaign.end.diff(moment().startOf('day'), 'days');
  const numOfDaysTillStart = campaign.start.diff(moment().startOf('day'), 'days');
  const campaignStatus = getCampaignStatus(campaign.start, campaign.end);
  const campaignIsActive = campaignStatus === 'Active';
  const campaignIsUpcoming = campaignStatus === 'Upcoming';
  const campaignHasEnded = campaignStatus === 'Completed';

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
          <Box sx={campaignDetailImageSx} component="img" src={campaign.imageUrl} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6} marginTop={isMobile ? 1 : 0}>
        <Stack component="div" spacing={1} justifyContent="center" alignItems="center">
          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Typography variant="h4">Status: {campaignStatus}</Typography>

            {campaignIsActive && (
              <Typography variant="h4" sx={campaignStatusTextSx}>
                Campaign ends in {numOfDaysTillEnd} {numOfDaysTillEnd === 1 ? 'day' : 'days'}!
              </Typography>
            )}

            {campaignIsUpcoming && (
              <Typography variant="h4" sx={campaignStatusTextSx}>
                Campaign starts in {numOfDaysTillStart} {numOfDaysTillStart === 1 ? 'day' : 'days'}!
              </Typography>
            )}

            {campaignHasEnded && (
              <Typography variant="h4" sx={campaignStatusTextSx}>
                Campaign has ended on {campaign.end.format(USER_FACING_DATE_FORMAT)}!
              </Typography>
            )}

            <Stack component="div" direction="row" spacing={2}>
              <CampaignDateInfoIcon label="Start" date={campaign.start} />

              <LinearScaleIcon fontSize="large" />

              <CampaignDateInfoIcon label="End" date={campaign.end} />
            </Stack>
          </Stack>

          <Stack sx={campaignInfoItemSx} component="div" spacing={1}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography variant="h4">{`${numTotalCoupons} coupons in total`}</Typography>

              <IconButtonWithTooltip
                sx={couponHelpIconButtonSx}
                icon={<HelpOutlineIcon fontSize="small" sx={couponHelpIconSx} />}
                tooltip="Learn more about coupons"
                onClick={() => {
                  log('[CampaignPublicInfoCard] Click coupon info button', { campaignId: campaign.id });
                  setIsCouponHelpOpen(true);
                }}
              />

              <CouponHelpDialog open={isCouponHelpOpen} campaign={campaign} setIsCouponHelpOpen={setIsCouponHelpOpen} />
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

      {campaignIsActive && (
        <Grid item xs={12} marginTop={1}>
          <Button
            fullWidth
            actionType="primary"
            onClick={() => {
              log("[CampaignPublicInfoCard] Click 'Contribute'", { campaignId: campaign.id });
              router.push(`/campaigns/${campaign.id}/contribute`);
            }}
          >
            Contribute
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default CampaignPublicInfoCard;
