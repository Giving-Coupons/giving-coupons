import { Dialog, Typography, useMediaQuery } from '@mui/material';
import Button from '../../generic/Button';
import {
  containerSx, desktopScreenDisplaySx,
  desktopSwiperSx,
  dialogPaperSx,
  mobileScreenDisplaySx,
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
import MockScreen from './MockMobileScreen';
import { PrimaryDonorData } from '../../../types/primaryDonor';
import FirstSlideDisplay from './FirstSlideDisplay';
import SecondSlideDisplay from './SecondSlideDisplay';
import ThirdSlideDisplay from './ThirdSlideDisplay';
import MockPersonalContribution from './MockPersonalContribution';
import MockCharityDialog from './MockCharityDialog';

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

interface SlideInstructionProps {
  children: ReactNode;
}

const SlideInstruction = ({ children }: SlideInstructionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
      {children}
    </Typography>
  );
};

const Slide = ({ instructions, display }: SlideProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={slideContainerSx}>
      <Stack sx={slideSx} component="div">
        <Stack component="div" spacing={2}>
          {instructions}
        </Stack>

        <MockScreen>
          <Stack sx={isMobile ? mobileScreenDisplaySx : desktopScreenDisplaySx} component="div" spacing={1}>
            {display}
          </Stack>
        </MockScreen>
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
          <SlideInstruction>Welcome to GIVING COUPONS!</SlideInstruction>

          <SlideInstruction>
            Our kind donor {primaryDonor.name} has sponsored you ${couponDenomination} to donate to a charity of your
            choice.
          </SlideInstruction>
        </>
      ),
      display: <FirstSlideDisplay couponDenomination={couponDenomination} primaryDonor={primaryDonor} />,
    },
    {
      instructions: (
        <SlideInstruction>
          You will see {charitiesCount} charities. You can only choose 1 of them to give the ${couponDenomination} to.
        </SlideInstruction>
      ),
      display: (
        <SecondSlideDisplay
          couponDenomination={couponDenomination}
          charitiesCount={charitiesCount}
          primaryDonor={primaryDonor}
        />
      ),
    },
    {
      instructions: (
        <SlideInstruction>
          Once this campaign ends, {primaryDonor.name} will transfer the ${couponDenomination} directly to your chosen
          charity through <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </SlideInstruction>
      ),
      display: <ThirdSlideDisplay couponDenomination={couponDenomination} />,
    },
    {
      instructions: (
        <SlideInstruction>
          You can click on the charity options to find out more about how your choice impacts someone&apos;s life!
        </SlideInstruction>
      ),
      display: <MockCharityDialog />,
    },
    {
      instructions: (
        <SlideInstruction>
          You may also choose to add a personal contribution. All payments are handled securely through{' '}
          <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />.
        </SlideInstruction>
      ),
      display: <MockPersonalContribution />,
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
