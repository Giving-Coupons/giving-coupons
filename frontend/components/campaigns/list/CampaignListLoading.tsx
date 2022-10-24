import { Grid } from '@mui/material';
import { itemSx } from '../../../styles/components/campaigns/list/CampaignListStyles';
import { Container } from '@mui/system';
import CampaignListCardLoading from './CampaignListCardLoading';

const CampaignListLoading = () => {
  return (
    <Container component="div">
      <Grid container spacing={2} marginLeft={2}>
        {[1, 2, 3].map((index) => (
          <Grid item sx={itemSx} xs={12} sm={6} md={4} key={index}>
            <CampaignListCardLoading />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CampaignListLoading;
