import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavDrawer from './NavDrawer';
import { isTabForCurrentPage, defaultNavigationTextPathMap, adminNavigationTextPathMap } from '../../utils/routes';
import { useRouter } from 'next/router';
import {
  activeTabSx,
  inactiveTabSx,
  toolbarLogoIconSx,
  toolbarLeftContainerSx,
  toolbarLogoSx,
  toolbarSx,
  toolbarHamburgerSx,
  adminCaptionSx,
} from '../../styles/components/navigation/NavbarStyles';

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const isAuthPage = router.pathname === '/admin/sign-up' || router.pathname === '/admin/sign-in';
  const isAdminSignedInPage = router.pathname.startsWith('/admin') && !isAuthPage;
  const navigationTextPathMap = isAdminSignedInPage ? adminNavigationTextPathMap : defaultNavigationTextPathMap;

  return (
    !isAuthPage && (
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={toolbarSx}>
          <Stack sx={toolbarLeftContainerSx} component="div" direction="row" spacing={1}>
            {isMobile && <MenuIcon sx={toolbarHamburgerSx} color="primary" onClick={() => setDrawerIsOpen(true)} />}

            <Link href="/">
              <Stack sx={toolbarLogoSx} component="div" direction="row" spacing={1}>
                {!isMobile && <Box sx={toolbarLogoIconSx} component="img" src="/logo.png" />}

                <Typography variant={isMobile ? 'h4' : 'h3'}>Giving Coupons</Typography>

                {isAdminSignedInPage && (
                  <Typography sx={adminCaptionSx} variant="caption" color="primary">
                    Admin
                  </Typography>
                )}
              </Stack>
            </Link>
          </Stack>

          {!isMobile && (
            <Stack component="div" direction="row">
              {navigationTextPathMap.entrySeq().map(([label, path]) => (
                <Link key={label} href={path}>
                  <Box sx={isTabForCurrentPage(path, router.pathname) ? activeTabSx : inactiveTabSx}>
                    <Typography variant="h4">{label}</Typography>
                  </Box>
                </Link>
              ))}
            </Stack>
          )}
        </Toolbar>

        <NavDrawer
          isOpen={isMobile && drawerIsOpen}
          setIsOpen={setDrawerIsOpen}
          navigationTextPathMap={navigationTextPathMap}
        />
      </AppBar>
    )
  );
};

export default NavBar;
