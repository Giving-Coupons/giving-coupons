import { SxProps } from '@mui/system';
import { theme } from '../../../../utils/theme';

export const containerSx: SxProps = {
  width: '100%',
  borderRadius: '20px',
  border: '1px solid',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderColor: theme.palette.neutral.light,
  padding: theme.spacing(2),
};

export const fieldsContainerSx: SxProps = {
  width: '92%',
};
