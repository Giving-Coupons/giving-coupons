import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, []);

  return targetReached;
};

const ResponsiveImage = () => {
  const isBreakpoint = useMediaQuery(768);
  return (
    <Box>
      {isBreakpoint ? (
        <Box>
          <Grid item lg={12}>
            <Image src="/charity-image-blob.png" layout="responsive" width="400px" height="400px"></Image>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ display: 'block', width: '100vw', marginTop: '2rem' }}>
          <Image src="/charity-image.png" layout="responsive" width="100vw" height="30vh"></Image>
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveImage;
