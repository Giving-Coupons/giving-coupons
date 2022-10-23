import { Box, Stack, useTheme } from '@mui/system';
import {
  topCameraSx,
  topAudioSx,
  headerSx,
  screenSx,
  mockTypographySx,
  mockAppBarSx,
  contentSx,
  toolbarLogoIconSx,
  mobileContainerSx,
  desktopContainerSx,
} from '../../../styles/components/redeem/MockDeviceStyles';
import { Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MockDevice = ({ children }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack sx={isMobile ? mobileContainerSx : desktopContainerSx} component="div">
      <Stack sx={headerSx} component="div" direction="row" spacing={1}>
        {isMobile && <Box sx={topAudioSx} />}

        <Box sx={topCameraSx} />
      </Stack>

      <Stack sx={screenSx} component="div">
        <Stack sx={mockAppBarSx} component="div" direction="row" spacing={1}>
          {isMobile ? (
            <MenuIcon fontSize="small" color="primary" />
          ) : (
            <Box sx={toolbarLogoIconSx} component="img" src="/logo.png" />
          )}

          <Typography sx={mockTypographySx}>Giving Coupons</Typography>
        </Stack>

        <Box sx={contentSx}>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default MockDevice;
