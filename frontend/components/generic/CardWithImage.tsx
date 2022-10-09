import { Box, Stack } from '@mui/system';
import {
  descriptionContainerSx,
  containerSx,
  imageContainerSx,
} from '../../styles/components/generic/CardWithImageStyles';
import ImageWithOverlay from './ImageWithOverlay';
import React from 'react';

interface Props {
  imageUrl: string;
  imageOverlayContent: React.ReactNode;
  descriptionContent: React.ReactNode;
}

const CardWithImage = ({ imageUrl, imageOverlayContent, descriptionContent }: Props) => {
  return (
    <Stack component="div" sx={containerSx}>
      <Box sx={imageContainerSx}>
        <ImageWithOverlay imageSrc={imageUrl}>{imageOverlayContent}</ImageWithOverlay>
      </Box>

      <Box sx={descriptionContainerSx} component="div">
        {descriptionContent}
      </Box>
    </Stack>
  );
};

export default CardWithImage;
