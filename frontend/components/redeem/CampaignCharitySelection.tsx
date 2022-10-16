import { Grid, Radio, Stack, Typography, useTheme } from '@mui/material';
import { containerSx, itemListSx } from '../../styles/redeem/indexStyles';
import { CouponRedeemData } from '../../types/coupons';
import { Nullable } from '../../types/utils';

import CampaignDescription from '../campaigns/CampaignDescription';
import CampaignCharityCard from '../charities/CampaignCharityCard';
import CampaignCharityList from '../charities/CampaignCharityList';
import Button from '../generic/Button';

type Props = {
  coupon: CouponRedeemData;
  campaignCharityId: Nullable<number>;
  setCampaignCharityId: (campaignCharityId: number) => void;
  goToNextPage: () => void;
};

const CampaignCharitySelection = ({ coupon, campaignCharityId, setCampaignCharityId, goToNextPage }: Props) => {
  const theme = useTheme();

  return (
    <Grid container sx={containerSx} component="main" justifyContent="center" padding={2}>
      <Grid item md={12} lg={4}>
        <Stack spacing={theme.spacing(2)} paddingBottom={4}>
          <Typography variant="h2">{coupon.campaign.name}</Typography>

          <CampaignDescription campaign={coupon.campaign} />

          <CampaignCharityList campaignCharities={coupon.charities} />
        </Stack>
      </Grid>

      <Grid item md={12} lg={8} container spacing={4}>
        <Grid item xs={12}>
          <Typography textAlign="center">You can make a difference too. Choose a coupon recipient!</Typography>

          <Typography variant="h3" textAlign="center" color={theme.palette.primary.main}>
            Choose a coupon recipient!
          </Typography>
        </Grid>

        {coupon.charities.map((campaignCharity, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Stack direction="row" alignItems="flex-start" onClick={() => setCampaignCharityId(campaignCharity.id)}>
              <Radio checked={campaignCharityId === campaignCharity.id} value={campaignCharity.id} />

              <Grid item sx={itemListSx} xs={12}>
                <CampaignCharityCard campaignCharity={campaignCharity} />
              </Grid>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} paddingTop={2}>
        <Stack alignItems="flex-end">
          <Button actionType="primary" disabled={!campaignCharityId} onClick={goToNextPage}>
            Next
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CampaignCharitySelection;
