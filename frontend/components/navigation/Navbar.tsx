import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { unsetAuthHeaders } from '../../frontendApis/helpers/authHeaders';
import {
  activeTabSx,
  adminCaptionSx,
  inactiveTabSx,
  toolbarDesktopLogoIconSx,
  toolbarHamburgerSx,
  toolbarLeftContainerSx,
  toolbarLogoSx,
  toolbarMobileLogoIconSx,
  toolbarSx,
} from '../../styles/components/navigation/NavbarStyles';
import { log } from '../../utils/analytics';
import {
  adminNavigationTextPathMap,
  adminPathPrefix,
  defaultNavigationTextPathMap,
  isTabForCurrentPage,
} from '../../utils/routes';
import Button from '../generic/Button';
import NavDrawer from './NavDrawer';

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const isAuthPage =
    router.pathname === `${adminPathPrefix}/sign-up` || router.pathname === `${adminPathPrefix}/sign-in`;
  const stepsPage = router.pathname === `/stats`;
  const isAdminSignedInPage = router.pathname.startsWith(adminPathPrefix) && !isAuthPage;
  const navigationTextPathMap = isAdminSignedInPage ? adminNavigationTextPathMap : defaultNavigationTextPathMap;

  const handleLogOut = () => {
    unsetAuthHeaders();
    router.push(`${adminPathPrefix}/sign-in`);
  };

  return isAuthPage || stepsPage ? (
    <></>
  ) : (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={toolbarSx}>
        <Stack sx={toolbarLeftContainerSx} component="div" direction="row" spacing={1}>
          {isMobile && <MenuIcon sx={toolbarHamburgerSx} color="primary" onClick={() => setDrawerIsOpen(true)} />}

          <Link href={isAdminSignedInPage ? adminPathPrefix : '/'}>
            <Stack sx={toolbarLogoSx} component="div" direction="row" spacing={1}>
              {isMobile ? (
                <Box sx={toolbarMobileLogoIconSx} component="img" src="/inline-logo.png" />
              ) : (
                <Box sx={toolbarDesktopLogoIconSx} component="img" src="/inline-logo.png" />
              )}

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
                <Box
                  sx={isTabForCurrentPage(path, router.pathname) ? activeTabSx : inactiveTabSx}
                  onClick={() => log('Navbar_click', { label })}
                >
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
