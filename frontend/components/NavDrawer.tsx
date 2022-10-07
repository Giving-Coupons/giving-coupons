import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { navigationTextPathMap } from '../utils/routes';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavDrawer = ({ isOpen, setIsOpen }: Props) => {
  const theme = useTheme();

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <List>
        <ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              sx={{ borderRadius: '100%', padding: 0, minHeight: 0, minWidth: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon sx={{ color: theme.palette.neutral.main }} />
            </Button>
          </ListItem>
        </ListItem>

        {navigationTextPathMap.entrySeq().map((pair) => (
          <ListItem key={pair[0]}>
            <ListItemButton href={pair[1]} component="a">
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
