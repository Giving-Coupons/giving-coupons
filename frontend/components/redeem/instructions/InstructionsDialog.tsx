import { Dialog, Typography, useMediaQuery } from '@mui/material';
import Button from '../../generic/Button';
import {
  containerSx,
  couponAmountSx,
  couponReceivedLineContainerSx,
  desktopSwiperSx,
  dialogPaperSx,
  lineSx,
  mobileSwiperSx,
  primaryDonorImageSx,
  screenDisplaySx,
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
import MobileScreen from './MobileScreen';
import { PrimaryDonorData } from '../../../types/primaryDonor';
import MockCharityCard from './MockCharityCard';

interface Props {
  open: boolean;
  handleClose: () => void;
  primaryDonor: PrimaryDonorData;
  couponDenomination: number;
  charitiesCount: number;
}

interface SlideProps {
  instructions: ReactNode;
  display: ReactNode;
}

const Slide = ({ instructions, display }: SlideProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={slideContainerSx}>
      <Stack sx={slideSx} component="div">
        <Stack component="div" spacing={2}>
          {instructions}
        </Stack>

        {isMobile ? <MobileScreen>{display}</MobileScreen> : null}
      </Stack>
    </Box>
  );
};

const InstructionsDialog = ({ open, handleClose, primaryDonor, couponDenomination, charitiesCount }: Props) => {
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
            Our kind donor {primaryDonor.name} has sponsored you ${couponDenomination} to donate to a charity of your
            choice.
          </Typography>
        </>
      ),
      display: (
        <Stack sx={screenDisplaySx} component="div">
          <Typography>You have received</Typography>

          <Typography sx={couponAmountSx}>${couponDenomination}</Typography>

          <Stack sx={couponReceivedLineContainerSx} component="div" direction="row">
            <Box sx={lineSx} />

            <Typography variant="caption" color={theme.palette.grey[700]}>
              From
            </Typography>

            <Box sx={lineSx} />
          </Stack>

          <Stack component="div" direction="row" alignItems="center" spacing={1}>
            <Box sx={primaryDonorImageSx} component="img" src={primaryDonor.imageBase64} />

            <Typography variant="h4">{primaryDonor.name}</Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You will see {charitiesCount} charities. You can only choose 1 of them to give the ${couponDenomination} to.
        </Typography>
      ),
      display: (
        <Stack sx={screenDisplaySx} component="div" spacing={1}>
          <Typography variant="caption" fontWeight={700}>
            Select a charity to give {primaryDonor.name}&apos;s ${couponDenomination}
          </Typography>
          {Array.from(Array(charitiesCount).keys()).map((index) => (
            <MockCharityCard key={index} />
          ))}
        </Stack>
      ),
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          Once this campaign ends, {primaryDonor.name} will transfer the ${couponDenomination} directly to your chosen
          charity through <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </Typography>
      ),
      display: null,
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You can click on the charity options to find out more about how your choice impacts someone&apos;s life!
        </Typography>
      ),
      display: null,
    },
    {
      instructions: (
        <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
          You may also choose to add a personal contribution. All payments are handled securely through{' '}
          <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </Typography>
      ),
      display: null,
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
              <Slide instructions={slideProp.instructions} display={slideProp.display} />
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
