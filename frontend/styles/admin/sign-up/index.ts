import { SxProps } from '@mui/material';

// Note that for consistency, the styles in '../sign-in' take reference from these values.

export const mainSx: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const boxSx: SxProps = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const h1Sx: SxProps = {
  mt: 2,
};

export const submitButtonSx: SxProps = {
  mt: 3,
  mb: 2,
};
