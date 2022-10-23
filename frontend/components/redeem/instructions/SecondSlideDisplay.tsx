import { screenDisplaySx } from '../../../styles/components/redeem/InstructionDialogStyles';
import { Typography } from '@mui/material';
import MockCharityCard from './MockCharityCard';
import { Stack } from '@mui/system';
import { PrimaryDonorData } from '../../../types/primaryDonor';

interface Props {
  couponDenomination: number;
  charitiesCount: number;
  primaryDonor: PrimaryDonorData;
}

const SecondSlideDisplay = ({ couponDenomination, charitiesCount, primaryDonor }: Props) => {
  return (
    <Stack sx={screenDisplaySx} component="div" spacing={1}>
      <Typography variant="caption" fontWeight={700}>
        Select a charity to give {primaryDonor.name}&apos;s ${couponDenomination}
      </Typography>

      {Array.from(Array(charitiesCount).keys()).map((index) => (
        <MockCharityCard key={index} />
      ))}
    </Stack>
  );
};

export default SecondSlideDisplay;
