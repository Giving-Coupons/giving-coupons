import { Box } from '@mui/system';
import useMediaQuery from '../utils/responsive';

const ResponsiveImage = () => {
  const isBreakpoint = useMediaQuery(768);
  return (
    <Box>
      {isBreakpoint ? (
        <Box sx={{ display: 'block', width: '100vw' }}>
          <Box sx={{ display: 'block', width: '100vw' }} component="img" src="/charity-image-blob.png" />
        </Box>
      ) : (
        <Box sx={{ display: 'block', width: '100vw', marginTop: '2rem' }}>
          <Box sx={{ display: 'block', height: '40vh', width: '100vw' }} component="img" src="/charity-image.png" />
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveImage;
