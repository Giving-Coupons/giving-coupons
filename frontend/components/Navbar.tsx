import { AppBar, Toolbar, useMediaQuery } from '@mui/material';
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
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && <MenuIcon onClick={() => setDrawerIsOpen(true)} />}
          <Link href="/">
            <a>Giving Coupons</a>
          </Link>
        </Stack>

        {!isMobile && (
          <Stack direction="row" spacing={2}>
            {navigationTextPathMap.entrySeq().map((pair) => (
              <Link key={pair[0]} href={pair[1]}>
                <a>{pair[0]}</a>
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
