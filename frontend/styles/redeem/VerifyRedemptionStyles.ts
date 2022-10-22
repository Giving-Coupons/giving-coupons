import { SxProps } from '@mui/material';

export const stackSx: SxProps = {
  border: '1px dashed lightGray',
  padding: '20px',
};

export const headerSx: SxProps = {
  color: 'gray',
};

export const imageSx: SxProps = {
  backgroundColor: 'lightGray',
  padding: '10px',
  borderRadius: '15px',
  minHeight: '50px',
  height: '50px',
  minWidth: '50px',
  width: '50px',
};

export const iconSx: SxProps = {
  ...imageSx,
  color: 'gray',
};
