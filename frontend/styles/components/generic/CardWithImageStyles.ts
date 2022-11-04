import { SxProps } from '@mui/system';
import { theme } from '../../../utils/theme';

const borderRadius = '20px';

export const containerSx: SxProps = {
  alignItems: 'center',
  height: '100%',
  boxShadow: `0px 0px 30px 10px ${theme.palette.neutral.light}`,
  borderRadius: borderRadius,
};

export const imageContainerSx: SxProps = {
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '45%',
  height: '45%',
  maxHeight: '45%',
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
};

export const descriptionContainerSx: SxProps = {
  justifyContent: 'space-between',
  paddingTop: 1,
  paddingBottom: 1,
  width: '90%',
  height: '55%',
  maxHeight: '55%',
};
