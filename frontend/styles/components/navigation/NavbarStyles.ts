import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const toolbarSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const toolbarLeftContainerSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
};

export const toolbarHamburgerSx: SxProps = {
  "&:hover": {
    cursor: 'pointer',
  }
}

export const toolbarLogoSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  "&:hover": {
    cursor: 'pointer',
  }
};

export const toolbarLogoIconSx: SxProps = {
  height: '1.5em',
};

export const inactiveTabSx: SxProps = {
  padding: '4px 16px',
  "&:hover": {
    cursor: 'pointer',
  }
};

export const activeTabSx: SxProps = {
  ...inactiveTabSx,
  color: theme.palette.primary.main,
  borderBottom: '4px solid',
  borderBottomColor: theme.palette.primary.main,
};
