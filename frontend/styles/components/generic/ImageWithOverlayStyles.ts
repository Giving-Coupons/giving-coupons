import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

export const imageContainerSx: SxProps = {
  position: 'relative',
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '100%',
  height: '100%',
  maxHeight: '100%',
  borderRadius: 'inherit',
};

export const aboveImageOverlayContainerSx: SxProps = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 20,
};

export const imageOverlaySx: SxProps = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.overlayTranslucent.main,
  zIndex: 10,
  borderRadius: 'inherit',
};

export const imageSx: SxProps = {
  minWidth: '100%',
  maxWidth: '100%',
  height: '100%',
  borderRadius: 'inherit',
};
