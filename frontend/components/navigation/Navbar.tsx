import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavDrawer from './NavDrawer';
import {
  isTabForCurrentPage,
  defaultNavigationTextPathMap,
  adminNavigationTextPathMap,
  adminPathPrefix,
} from '../../utils/routes';
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
import Button from '../generic/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { unsetAuthHeaders } from '../../frontendApis/helpers/authHeaders';

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const isAuthPage =
    router.pathname === `${adminPathPrefix}/sign-up` || router.pathname === `${adminPathPrefix}/sign-in`;
  const isAdminSignedInPage = router.pathname.startsWith(adminPathPrefix) && !isAuthPage;
  const navigationTextPathMap = isAdminSignedInPage ? adminNavigationTextPathMap : defaultNavigationTextPathMap;

  const handleLogOut = () => {
    unsetAuthHeaders();
    router.push(`${adminPathPrefix}/sign-in`);
  };

  return isAuthPage ? (
    <></>
  ) : (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={toolbarSx}>
        <Stack sx={toolbarLeftContainerSx} component="div" direction="row" spacing={1}>
          {isMobile && <MenuIcon sx={toolbarHamburgerSx} color="primary" onClick={() => setDrawerIsOpen(true)} />}

          <Link href={isAdminSignedInPage ? adminPathPrefix : '/'}>
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

            {isAdminSignedInPage && (
              <Button actionType="secondary" onClick={handleLogOut} endIcon={<LogoutIcon />}>
                Log Out
              </Button>
            )}
          </Stack>
        )}
      </Toolbar>

      <NavDrawer
        isOpen={isMobile && drawerIsOpen}
        setIsOpen={setDrawerIsOpen}
        navigationTextPathMap={navigationTextPathMap}
      />
    </AppBar>
  );
};

export default NavBar;
