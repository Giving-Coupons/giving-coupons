import { Grid, Radio, Stack, Typography } from '@mui/material';
import { makeMockCampaignCharity } from '../../pages/campaigns/mock';
import { containerSx } from '../../styles/redeem/indexStyles';
import { CouponRedeemData } from '../../types/coupons';
import { Nullable } from '../../types/utils';
import { theme } from '../../utils/theme';
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
  return (
    <Grid container sx={containerSx} component="main" justifyContent="center" paddingBottom={2}>
      <Grid item md={12} lg={4} container paddingLeft={2} paddingRight={2} paddingBottom={2}>
        <Grid xs={12} item paddingLeft={2} paddingRight={2}>
          <Stack spacing={theme.spacing(2)}>
            <Stack spacing={theme.spacing(1)}>
              <Typography variant="h2">{coupon.campaign.name}</Typography>

              <CampaignDescription campaign={coupon.campaign} />
            </Stack>

            <CampaignCharityList campaignCharities={coupon.charities} />
          </Stack>
        </Grid>
      </Grid>

      <Grid item md={12} lg={8} container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={2}>
        <Grid xs={12} padding={2}>
          <Typography textAlign="center">You can make a difference too. Choose a coupon recipient!</Typography>

          <Typography variant="h3" textAlign="center" color={theme.palette.primary.main}>
            Choose a coupon recipient!
          </Typography>
        </Grid>

        {coupon.charities.map((campaignCharity, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="flex-start"
              onClick={() => setCampaignCharityId(campaignCharity.id)}
            >
              <Radio checked={campaignCharityId === campaignCharity.id} value={campaignCharity.id} />

              <CampaignCharityCard campaignCharity={makeMockCampaignCharity(1)} />
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
        alignItems="flex-end"
        justifyContent="flex-end"
        container
        paddingLeft={2}
        paddingRight={2}
        paddingBottom={2}
      >
        <Button actionType="primary" disabled={!campaignCharityId} onClick={goToNextPage}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default CampaignCharitySelection;
