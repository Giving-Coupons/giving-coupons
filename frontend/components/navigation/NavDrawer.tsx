import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { OrderedMap } from 'immutable';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import api from '../../frontendApis';
import { unsetAuthHeaders } from '../../frontendApis/helpers/authHeaders';
import {
  activeTabSx,
  closeButtonSx,
  closeIconSx,
  drawerPaperSx,
  headerListItemSx,
  inactiveTabSx,
  logoutButtonSx,
  tabListItemSx,
} from '../../styles/components/navigation/NavDrawerStyles';
import { log } from '../../utils/analytics';
import { adminPathPrefix, isTabForCurrentPage } from '../../utils/routes';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navigationTextPathMap: OrderedMap<string, string>;
}

const NavDrawer = ({ isOpen, setIsOpen, navigationTextPathMap }: Props) => {
  const router = useRouter();

  const isAdminPage = router.pathname.startsWith(adminPathPrefix);

  const handleLogOut = () => {
    setIsOpen(false);
    api.admins.logoutAdmin().then(() => {
      unsetAuthHeaders();
      router.push(`${adminPathPrefix}/sign-in`);
    });
  };

  return (
    <Drawer PaperProps={{ sx: drawerPaperSx }} anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <List>
        <ListItem sx={headerListItemSx}>
          <Button sx={closeButtonSx} onClick={() => setIsOpen(false)}>
            <CloseIcon sx={closeIconSx} />
          </Button>
        </ListItem>

        {navigationTextPathMap.entrySeq().map(([label, path]) => (
          <ListItem key={label} sx={tabListItemSx}>
            <ListItemButton
              sx={isTabForCurrentPage(path, router.pathname) ? activeTabSx : inactiveTabSx}
              onClick={() => {
                log(`[NavDrawer] Click "${label}"`);
                router.push(path);
                setIsOpen(false);
              }}
            >
              <ListItemText>
                <Typography variant="h4">{label}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}

        {isAdminPage && (
          <ListItem sx={tabListItemSx}>
            <ListItemButton sx={inactiveTabSx} onClick={handleLogOut}>
              <Stack sx={logoutButtonSx} component="div" direction="row" spacing={1}>
                <Typography variant="h4">Log Out</Typography>

                <LogoutIcon />
              </Stack>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
