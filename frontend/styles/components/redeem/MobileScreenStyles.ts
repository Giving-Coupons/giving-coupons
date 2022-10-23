import { SxProps } from '@mui/system';

export const containerSx: SxProps = {
  border: '2px solid white',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  height: '68%',
  width: '88%',
  alignItems: 'center',
};

export const headerSx: SxProps = {
  justifyContent: 'center',
  padding: '8px 0',
};

export const topAudioSx: SxProps = {
  border: '2px solid white',
  width: '32px',
  height: '8px',
  borderRadius: '100px',
};

export const topCameraSx: SxProps = {
  border: '2px solid white',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
};

export const screenSx: SxProps = {
  flex: 1,
  backgroundColor: 'white',
  width: '96%',
};

export const mockAppBarSx: SxProps = {
  alignItems: 'center',
  padding: '4px',
};

export const mockTypographySx: SxProps = {
  fontSize: '0.8rem',
  fontWeight: 700,
};

export const contentSx: SxProps = {
  display: 'flex',
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
