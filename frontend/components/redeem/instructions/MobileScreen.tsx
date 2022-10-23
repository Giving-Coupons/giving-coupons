import { Box, Stack } from '@mui/system';
import {
  containerSx,
  topCameraSx,
  topAudioSx,
  headerSx,
  screenSx,
  mockTypographySx,
  mockAppBarSx,
  contentSx,
} from '../../../styles/components/redeem/MobileScreenStyles';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MobileScreen = ({ children }: Props) => {
  return (
    <Stack sx={containerSx} component="div">
      <Stack sx={headerSx} component="div" direction="row" spacing={1}>
        <Box sx={topAudioSx} />

        <Box sx={topCameraSx} />
      </Stack>

      <Stack sx={screenSx} component="div">
        <Stack sx={mockAppBarSx} component="div" direction="row" spacing={1}>
          <MenuIcon fontSize="small" color="primary" />

          <Typography sx={mockTypographySx}>Giving Coupons</Typography>
        </Stack>

        <Box sx={contentSx}>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default MobileScreen;
