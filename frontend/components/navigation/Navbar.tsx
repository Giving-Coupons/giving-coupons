import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavDrawer from './NavDrawer';
import { isTabForCurrentPage, navigationTextPathMap } from '../../utils/routes';
import { useRouter } from 'next/router';
import {
  activeTabSx,
  inactiveTabSx,
  toolbarHamburgerSx,
  toolbarLeftContainerSx,
  toolbarLogoSx,
  toolbarSx,
} from '../../styles/components/navigation/NavbarStyles';

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={toolbarSx}>
        <Stack sx={toolbarLeftContainerSx} component="div" direction="row" spacing={1}>
          {isMobile && <MenuIcon color="primary" onClick={() => setDrawerIsOpen(true)} />}

          <Link href="/">
            <a>
              <Stack sx={toolbarLogoSx} component="div" direction="row" spacing={1}>
                {!isMobile && <Box sx={toolbarHamburgerSx} component="img" src="/logo.png" />}

                <Typography variant={isMobile ? 'h4' : 'h3'}>Giving Coupons</Typography>
              </Stack>
            </a>
          </Link>
        </Stack>

        {!isMobile && (
          <Stack component="div" direction="row">
            {navigationTextPathMap.entrySeq().map((pair) => (
              <Link key={pair[0]} href={pair[1]}>
                <a>
                  <Box sx={isTabForCurrentPage(pair[1], router.pathname) ? activeTabSx : inactiveTabSx}>
                    <Typography variant="h4">{pair[0]}</Typography>
                  </Box>
                </a>
              </Link>
            ))}
          </Stack>
        )}
      </Toolbar>

      <NavDrawer isOpen={isMobile && drawerIsOpen} setIsOpen={setDrawerIsOpen} />
    </AppBar>
  );
};

export default NavBar;
