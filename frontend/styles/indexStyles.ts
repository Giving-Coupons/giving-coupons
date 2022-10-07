import {SxProps} from "@mui/system";
import {theme} from "../utils/theme";

export const examplesContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const buttonSx: SxProps = {
  width: '50%',
  margin: '10px 0px',
};

export const imageContainerSx: SxProps = {
  position: 'relative',
};

export const imageSx: SxProps = {
  maxWidth: '100%',
}

export const imageOverlaySx: SxProps = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.overlayTranslucent.main,
  zIndex: 10,
};

export const graphSx: SxProps = {
  position: 'absolute',
  bottom: '2em',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '90%',
  height: '2em',
  zIndex: 20,
};

export const primaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.primaryTranslucent.main,
};

export const secondaryTranslucentOverlaySx: SxProps = {
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: theme.palette.secondaryTranslucent.main,
};

export const contrastText: SxProps = {
  color: theme.palette.contrast.dark,
}
