import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../../utils/theme';

const ResponsiveImage = () => {
  const isBreakpointSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box>
      {isBreakpointSm || isBreakpointMd ? (
        <Box sx={{ display: 'block', width: '100vw', marginTop: '2rem' }}>
          <Box sx={{ display: 'block', height: '40vh', width: '100vw' }} component="img" src="/charity-image.png" />
        </Box>
      ) : (
        <Box sx={{ display: 'block', width: '100vw' }}>
          <Box sx={{ display: 'block', width: '100vw' }} component="img" src="/charity-image-blob.png" />
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveImage;
