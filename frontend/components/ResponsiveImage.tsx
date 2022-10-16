import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
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
            <Box
              sx={{ display: 'block', height: '400px', width: '100vw' }}
              component="img"
              src="/charity-image-blob.png"
            />
          </Grid>
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
