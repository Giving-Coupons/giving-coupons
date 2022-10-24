import { Grid } from '@mui/material';
import CampaignListCard from './CampaignListCard';
import { CampaignListData } from '../../../types/campaigns';
import { Container } from '@mui/system';
import { itemSx } from '../../../styles/components/campaigns/list/CampaignListStyles';

interface Props {
  campaigns: CampaignListData[];
}

const CampaignList = ({ campaigns }: Props) => {
  return (
    <Container component="div">
      <Grid container spacing={2} marginLeft={2}>
        {campaigns.map((campaign, index) => (
          <Grid item sx={itemSx} xs={12} sm={6} md={4} key={index}>
            <CampaignListCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CampaignList;
