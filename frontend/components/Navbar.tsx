import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavDrawer from './NavDrawer';
import { navigationTextPathMap } from '../utils/routes';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }} component="div">
          {isMobile && <MenuIcon color="primary" onClick={() => setDrawerIsOpen(true)} />}
          <Link href="/">
            <a>
              <Typography variant={isMobile ? 'h4' : 'h3'}>Giving Coupons</Typography>
            </a>
          </Link>
        </Stack>

        {!isMobile && (
          <Stack direction="row" spacing={2} component="div">
            {navigationTextPathMap.entrySeq().map((pair) => (
              <Link key={pair[0]} href={pair[1]}>
                <a>
                  <Typography variant="h4">{pair[0]}</Typography>
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
