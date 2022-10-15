import { SxProps } from '@mui/system';
import { theme } from '../../../../utils/theme';

export const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '16px',
};

export const sectionSx: SxProps = {
  padding: '40px',
};

export const cardSx: SxProps = {
  alignItems: 'center',
  height: '100%',
  boxShadow: `0px 0px 40px 0px ${theme.palette.neutral.light}`,
  borderRadius: '20px',
  padding: '4%',
};

export const charityContainerSx: SxProps = {
  alignItems: 'center',
  height: '20%',
  width: '100%',
};

export const charityItemSx: SxProps = {
  justifyContent: 'space-evenly',
};

export const primaryDonorItemSx: SxProps = {
  width: '100%',
  alignItems: 'center',
};

export const logoSx: SxProps = {
  height: '32px',
  width: 'auto',
  objectFit: 'contain',
};

export const donationTableHeaderSx: SxProps = {
  alignItems: 'space-between',
  justifyContent: 'space-between',
};

export const couponsTableContainerSx: SxProps = {
  maxHeight: '400px',
  width: '100%',
  overflow: 'auto',
};

export const campaignImageSx: SxProps = {
  width: '100%',
  height: '100%',
  minHeight: '100%',
  maxHeight: '100%',
};

export const campaignInfoCardHeaderSx: SxProps = {
  justifyContent: 'space-between',
  alignItems: 'start',
};

export const campaignInfoItemSx: SxProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  padding: '4%',
  backgroundColor: '#F4F4F4',
};

export const campaignMoneyIconSx: SxProps = {
  alignItems: 'center',
};

export const campaignDateIconSx: SxProps = {
  alignItems: 'center',
};
