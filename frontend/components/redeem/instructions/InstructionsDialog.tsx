import { Dialog, useMediaQuery } from '@mui/material';
import Button from '../../generic/Button';
import {
  containerSx,
  desktopSwiperSx,
  dialogPaperSx,
  mobileSwiperSx,
  slideContainerSx,
  slideSx,
} from '../../../styles/components/redeem/InstructionDialogStyles';
import { Box, Stack, useTheme } from '@mui/system';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface SlideProps {
  instructions: string;
}

const Slide = ({ instructions }: SlideProps) => {
  return (
    <Box sx={slideContainerSx}>
      <Stack sx={slideSx} component="div">
        {instructions}
      </Stack>
    </Box>
  );
};

const InstructionsDialog = ({ open, handleClose }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const slideProps: SlideProps[] = [{ instructions: 'Hello 1' }, { instructions: 'Hello 2' }];

  return (
    <Dialog fullScreen open={open} onClose={handleClose} PaperProps={{ sx: dialogPaperSx }}>
      <Stack sx={containerSx} component="div">
        <Swiper
          style={isMobile ? mobileSwiperSx : desktopSwiperSx}
          modules={[Navigation, Pagination]}
          navigation={!isMobile}
          pagination
          slidesPerView={1}
        >
          {slideProps.map((slideProp, index) => (
            <SwiperSlide key={index}>
              <Slide instructions={slideProp.instructions} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button actionType="primary" onClick={handleClose}>
          Close Instructions
        </Button>
      </Stack>
    </Dialog>
  );
};

export default InstructionsDialog;
