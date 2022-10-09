import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

const borderRadius = '20px';

export const containerSx: SxProps = {
  alignItems: 'center',
  height: '100%',
  boxShadow: `0px 0px 8px 0px ${theme.palette.neutral.light}`,
  borderRadius: borderRadius,
};

export const imageContainerSx: SxProps = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '40%',
  height: '40%',
  maxHeight: '40%',
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
};

export const descriptionContainerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '4px 0',
  width: '90%',
  height: '100%',
};
