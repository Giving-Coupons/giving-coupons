import { SxProps } from '@mui/material';

export const dialogSx: SxProps = {
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      width: '100%',
      maxWidth: '1000px',
    },
  },
};

export const dialogTitleSx: SxProps = {
  padding: '10px',
};

export const dialogContentSx: SxProps = { padding: 0 };

export const dialogContentTextSx: SxProps = { padding: '10px' };

export const charityLogoSx: SxProps = {
  maxHeight: '40px',
  minHeight: '40px',
  height: '40px',
};

export const charityImageSx: SxProps = {
  width: '100%',
};
