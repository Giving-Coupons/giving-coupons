import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, SxProps, useTheme } from '@mui/system';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavDrawer from './NavDrawer';
import { isTabForCurrentPage, navigationTextPathMap } from '../utils/routes';
import { useRouter } from 'next/router';
import { theme } from '../utils/theme';

const inactiveTabSx: SxProps = {
  padding: '4px 16px',
};

const activeTabSx: SxProps = {
  ...inactiveTabSx,
  color: theme.palette.primary.main,
  borderBottom: '4px solid',
  borderBottomColor: theme.palette.primary.main,
};

const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }} component="div">
          {isMobile && <MenuIcon color="primary" onClick={() => setDrawerIsOpen(true)} />}

          <Link href="/">
            <a>
              <Stack direction="row" component="div" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {!isMobile && <Box sx={{ height: '1.5em' }} component="img" src="/logo.png" />}

                <Typography variant={isMobile ? 'h4' : 'h3'}>Giving Coupons</Typography>
              </Stack>
            </a>
          </Link>
        </Stack>

        {!isMobile && (
          <Stack direction="row" component="div">
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
