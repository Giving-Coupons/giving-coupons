import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { isTabForCurrentPage, navigationTextPathMap } from '../../utils/routes';
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
} from '../../styles/components/navigation/NavDrawerStyles';

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

        {navigationTextPathMap.entrySeq().map(([label, path]) => (
          <ListItem key={label} sx={tabListItemSx}>
            <ListItemButton
              sx={isTabForCurrentPage(path, router.pathname) ? activeTabSx : inactiveTabSx}
              component="a"
              href={path}
            >
              <ListItemText>
                <Typography variant="h4">{label}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
