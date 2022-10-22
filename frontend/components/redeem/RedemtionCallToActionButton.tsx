import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  centerSx,
  descriptionSx,
  gridContainerSx,
  iconBoxSx,
  iconGridSx,
  stackSx,
} from '../../styles/redeem/RedemtionCallToActionButtonStyles';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const RedemtionCallToActionButton = ({ icon, title, description, onClick }: Props) => {
  return (
    <Grid container sx={gridContainerSx} onClick={onClick}>
      <Grid item xs={10}>
        <Stack sx={stackSx} spacing={1}>
          <Stack direction="row" spacing={1.5} sx={centerSx}>
            <Box sx={iconBoxSx}>{icon}</Box>

            <Typography variant="h2">{title}</Typography>
          </Stack>

          <Typography sx={descriptionSx}>{description}</Typography>
        </Stack>
      </Grid>

      <Grid item xs={2} container sx={iconGridSx}>
        <ChevronRightIcon fontSize="large" />
      </Grid>
    </Grid>
  );
};

export default RedemtionCallToActionButton;
