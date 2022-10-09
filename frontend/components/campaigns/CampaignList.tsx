import { Grid, useMediaQuery } from '@mui/material';
import CampaignListCard from './CampaignListCard';
import { CampaignListData } from '../../types/campaigns';
import { Container, useTheme } from '@mui/system';
import { desktopContainerSx, itemSx, mobileContainerSx } from '../../styles/components/campaigns/CampaignListStyles';

interface Props {
  campaigns: CampaignListData[];
}

const CampaignList = ({ campaigns }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container sx={isMobile ? mobileContainerSx : desktopContainerSx} component="div">
      <Grid container spacing={2}>
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
