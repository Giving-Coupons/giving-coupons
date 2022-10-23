import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import {
  centerSx,
  descriptionStackSx,
  descriptionSx,
  gridContainerSx,
  headerStackSx,
  iconBoxSx,
  iconGridSx,
  textGridSx,
  titleSx,
} from '../../styles/components/redeem/CallToActionButtonStyles';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CallToActionButton = ({ icon, title, description, onClick }: Props) => {
  return (
    <Grid container sx={gridContainerSx} onClick={onClick}>
      <Grid item xs={11} sx={textGridSx}>
        <Stack sx={headerStackSx} spacing={1}>
          <Stack direction="row" spacing={1.5} sx={centerSx}>
            <Box sx={iconBoxSx}>{icon}</Box>

            <Typography variant="h2" sx={titleSx}>
              {title}
            </Typography>
          </Stack>

          <Stack justifyContent="center" sx={descriptionStackSx}>
            <Typography sx={descriptionSx}>{description}</Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={1} sx={iconGridSx}>
        <ChevronRightIcon />
      </Grid>
    </Grid>
  );
};

export default CallToActionButton;
