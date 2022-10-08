import {SxProps} from "@mui/system";
import {theme} from "../../../utils/theme";

export const toolbarSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const toolbarLeftContainerSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
}

export const toolbarHamburgerSx: SxProps = {
  height: '1.5em',
}

export const toolbarLogoSx: SxProps = {
  display: 'flex',
  alignItems: 'center'
}

export const inactiveTabSx: SxProps = {
  padding: '4px 16px',
};

export const activeTabSx: SxProps = {
  ...inactiveTabSx,
  color: theme.palette.primary.main,
  borderBottom: '4px solid',
  borderBottomColor: theme.palette.primary.main,
};
