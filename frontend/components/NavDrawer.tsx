import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { navigationTextPathMap } from '../utils/routes';
import { Dispatch, SetStateAction } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavDrawer = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <List>
        <ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              sx={{ borderRadius: '100%', padding: 0, minHeight: 0, minWidth: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </ListItem>
        </ListItem>

        {navigationTextPathMap.entrySeq().map((pair) => (
          <ListItem key={pair[0]}>
            <ListItemButton href={pair[1]} component="a">
              <ListItemText primary={pair[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
