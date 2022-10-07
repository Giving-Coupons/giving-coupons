import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { isTabForCurrentPage, navigationTextPathMap } from '../utils/routes';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import {
  activeTabSx,
  closeButtonSx,
  closeIconSx,
  drawerPaperSx,
  headerListItemSx,
  inactiveTabSx,
  tabListItemSx,
} from '../styles/components/NavDrawerStyles';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavDrawer = ({ isOpen, setIsOpen }: Props) => {
  const router = useRouter();

  return (
    <Drawer PaperProps={{ sx: drawerPaperSx }} anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <List>
        <ListItem sx={headerListItemSx}>
          <Button sx={closeButtonSx} onClick={() => setIsOpen(false)}>
            <CloseIcon sx={closeIconSx} />
          </Button>
        </ListItem>

        {navigationTextPathMap.entrySeq().map((pair) => (
          <ListItem key={pair[0]} sx={tabListItemSx}>
            <ListItemButton
              sx={isTabForCurrentPage(pair[1], router.pathname) ? activeTabSx : inactiveTabSx}
              component="a"
              href={pair[1]}
            >
              <ListItemText>
                <Typography variant="h4">{pair[0]}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
