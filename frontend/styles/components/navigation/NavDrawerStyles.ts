import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const drawerPaperSx: SxProps = {
  width: '70%',
};

export const headerListItemSx: SxProps = {
  display: 'flex',
  justifyContent: 'start',
};

export const closeButtonSx: SxProps = {
  borderRadius: '100%',
  padding: '0px',
  minHeight: '0px',
  minWidth: '0px',
};

export const closeIconSx: SxProps = {
  color: theme.palette.neutral.main,
};

export const tabListItemSx: SxProps = {
  paddingLeft: '0px',
  paddingRight: '0px',
};

export const inactiveTabSx: SxProps = {
  marginLeft: '8px',
  marginRight: '8px',
  borderRadius: '8px',
};

export const activeTabSx: SxProps = {
  ...inactiveTabSx,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
};

export const logoutButtonSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  margin: '0px',
  color: theme.palette.neutral.light,
};
