import { Box, Stack } from '@mui/system';
import {
  descriptionContainerSx,
  containerSx,
  imageContainerSx,
} from '../../styles/components/generic/CardWithImageStyles';
import ImageWithOverlay from './ImageWithOverlay';
import React from 'react';
import { SxProps } from '@mui/material';
import { combineSxProps } from '../../utils/types';

interface Props {
  imageUrl: string;
  imageOverlayContent: React.ReactNode;
  descriptionContent: React.ReactNode;

  containerSxProps?: SxProps;
  imageContainerSxProps?: SxProps;
  descriptionContainerSxProps?: SxProps;
}

const CardWithImage = ({
  imageUrl,
  imageOverlayContent,
  descriptionContent,
  containerSxProps = {},
  imageContainerSxProps = {},
  descriptionContainerSxProps = {},
}: Props) => {
  return (
    <Stack component="div" sx={combineSxProps(containerSx, containerSxProps)}>
      <Box sx={combineSxProps(imageContainerSx, imageContainerSxProps)}>
        <ImageWithOverlay imageSrc={imageUrl}>{imageOverlayContent}</ImageWithOverlay>
      </Box>

      <Box sx={combineSxProps(descriptionContainerSx, descriptionContainerSxProps)} component="div">
        {descriptionContent}
      </Box>
    </Stack>
  );
};

export default CardWithImage;
