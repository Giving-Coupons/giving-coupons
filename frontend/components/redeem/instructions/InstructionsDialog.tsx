import { Dialog, Typography, useMediaQuery } from '@mui/material';
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
import { ReactNode } from 'react';
import { givingSgLogoSx } from '../../../styles/components/redeem/RedeemStyles';

interface Props {
  open: boolean;
  handleClose: () => void;
  primaryDonorName: string;
  couponDenomination: number;
  charitiesCount: number;
}

interface SlideProps {
  instructions: ReactNode;
}

const Slide = ({ instructions }: SlideProps) => {
  return (
    <Box sx={slideContainerSx}>
      <Stack sx={slideSx} component="div">
        <Stack component="div" spacing={2}>
          {instructions}
        </Stack>
      </Stack>
    </Box>
  );
};

const InstructionsDialog = ({ open, handleClose, primaryDonorName, couponDenomination, charitiesCount }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const slideProps: SlideProps[] = [
    {
      instructions: (
        <>
          <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
            Welcome to GIVING COUPONS!
          </Typography>

          <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
            Our kind donor {primaryDonorName} has sponsored you ${couponDenomination} to donate to a charity of your
            choice.
          </Typography>
        </>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You will see {charitiesCount} charities. You can only choose 1 of them to give the ${couponDenomination} to.
        </Typography>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          Once this campaign ends, {primaryDonorName} will transfer the ${couponDenomination} directly to your chosen
          charity through <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </Typography>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You can click on the charity options to find out more about how your choice impacts someone&apos;s life!
        </Typography>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You may also choose to add a personal contribution. All payments are handled securely through{' '}
          <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </Typography>
      ),
    },
  ];

  return (
    <Dialog fullScreen open={open} onClose={handleClose} PaperProps={{ sx: dialogPaperSx }}>
      <Stack sx={containerSx} component="div">
        <Typography align="center" component="div" variant="h2">
          Instructions
        </Typography>

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