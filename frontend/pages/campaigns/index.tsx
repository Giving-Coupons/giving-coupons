import DisplayCard from '../../components/DisplayCard';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

const Campaigns = () => {
  return (
    <Container sx={{ width: '70%', paddingTop: '8px', paddingBottom: '8px' }}>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
          <Grid item xs={4} sx={{ height: '480px' }} key={index}>
            <DisplayCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Campaigns;
