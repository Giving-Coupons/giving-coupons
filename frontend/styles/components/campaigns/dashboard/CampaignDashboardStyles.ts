import { SxProps } from '@mui/system';
import { theme } from '../../../../utils/theme';

export const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '16px',
};

export const cardSx: SxProps = {
  alignItems: 'center',
  height: '100%',
  boxShadow: `0px 0px 40px 0px ${theme.palette.neutral.light}`,
  borderRadius: '20px',
  padding: '4%',
};

export const charityContainerSx: SxProps = {
  height: '20%',
  width: '100%',
};

export const charityItemSx: SxProps = {
  justifyContent: 'space-evenly',
};

export const primaryDonorItemSx: SxProps = {
  width: '100%',
  alignItems: 'center',
};

export const logoSx: SxProps = {
  height: '100%',
  objectFit: 'cover',
};
