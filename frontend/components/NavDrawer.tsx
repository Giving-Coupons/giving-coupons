import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { isTabForCurrentPage, navigationTextPathMap } from '../utils/routes';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { SxProps, useTheme } from '@mui/system';
import { useRouter } from 'next/router';
import { theme } from '../utils/theme';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const inactiveTabSx: SxProps = {
  marginLeft: '8px',
  marginRight: '8px',
  borderRadius: '8px',
};

const activeTabSx: SxProps = {
  ...inactiveTabSx,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
};

const tabListItemSx: SxProps = {
  paddingLeft: '0px',
  paddingRight: '0px',
};

const drawerPaperSx: SxProps = {
  width: '70%',
};

const NavDrawer = ({ isOpen, setIsOpen }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)} PaperProps={{ sx: drawerPaperSx }}>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'start' }}>
          <Button sx={{ borderRadius: '100%', padding: 0, minHeight: 0, minWidth: 0 }} onClick={() => setIsOpen(false)}>
            <CloseIcon sx={{ color: theme.palette.neutral.main }} />
          </Button>
        </ListItem>

        {navigationTextPathMap.entrySeq().map((pair) => (
          <ListItem key={pair[0]} sx={tabListItemSx}>
            <ListItemButton
              href={pair[1]}
              component="a"
              sx={isTabForCurrentPage(pair[1], router.pathname) ? activeTabSx : inactiveTabSx}
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
