import { Box } from '@mui/system';
import {
  aboveImageOverlayContainerSx,
  imageContainerSx,
  imageOverlaySx,
  imageSx,
} from '../../styles/components/generic/ImageWithOverlayStyles';
import React from 'react';

interface Props {
  children: React.ReactNode;
  imageSrc: string;
}

const ImageWithOverlay = ({ children, imageSrc }: Props) => {
  return (
    <Box sx={imageContainerSx} component="div">
      <Box sx={aboveImageOverlayContainerSx}>{children}</Box>

      <Box sx={imageOverlaySx} />

      <Box sx={imageSx} component="img" src={imageSrc} />
    </Box>
  );
};

export default ImageWithOverlay;
