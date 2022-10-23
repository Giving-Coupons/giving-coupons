import { Typography } from '@mui/material';
import MockCharityCard from './MockCharityCard';
import { PrimaryDonorData } from '../../../types/primaryDonor';

interface Props {
  couponDenomination: number;
  charitiesCount: number;
  primaryDonor: PrimaryDonorData;
}

const SecondSlideDisplay = ({ couponDenomination, charitiesCount, primaryDonor }: Props) => {
  return (
    <>
      <Typography variant="caption" fontWeight={700}>
        Select a charity to give {primaryDonor.name}&apos;s ${couponDenomination}
      </Typography>

      {Array.from(Array(charitiesCount).keys()).map((index) => (
        <MockCharityCard key={index} />
      ))}
    </>
  );
};

export default SecondSlideDisplay;
