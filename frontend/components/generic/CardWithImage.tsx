import { Box, Stack } from '@mui/system';
import React from 'react';
import {
  containerSx,
  descriptionContainerSx,
  imageContainerSx,
} from '../../styles/components/generic/CardWithImageStyles';
import ImageWithOverlay from './ImageWithOverlay';

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
