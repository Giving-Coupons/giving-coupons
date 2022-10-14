import { Box } from '@mui/system';
import {
  aboveImageOverlayContainerSx,
  imageContainerSx,
  imageOverlaySx,
  imageSx,
} from '../../styles/components/generic/ImageWithOverlayStyles';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  imageSrc: string;
  shouldApplyOverlay?: boolean;
}

const ImageWithOverlay = ({ children, imageSrc, shouldApplyOverlay = true }: Props) => {
  return (
    <Box sx={imageContainerSx} component="div">
      {shouldApplyOverlay && (
        <>
          <Box sx={aboveImageOverlayContainerSx}>{children}</Box>

          <Box sx={imageOverlaySx} />
        </>
      )}

      <Box sx={imageSx} component="img" src={imageSrc} />
    </Box>
  );
};

export default ImageWithOverlay;
