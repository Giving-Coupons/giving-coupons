import { FormControl, Radio, RadioGroup, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  desktopCampaignCharitySelectionSx,
  formContainerSx,
  mobileCampaignCharitySelectionSx,
  radioSx,
} from '../../styles/components/redeem/RedeemStyles';
import { CampaignCharityDonationPublicData } from '../../types/campaignCharities';
import CampaignCharityCard from '../campaigns/campaignCharities/CampaignCharityCard';
import { Nullable } from '../../types/utils';
import { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@mui/system';

interface Props {
  primaryDonorName: string;
  couponDenomination: number;
  campaignCharities: CampaignCharityDonationPublicData[];
  selectedCampaignCharityId: Nullable<number>;
  setSelectedCampaignCharityId: Dispatch<SetStateAction<Nullable<number>>>;
}

const CampaignCharitySelection = ({
  primaryDonorName,
  couponDenomination,
  campaignCharities,
  selectedCampaignCharityId,
  setSelectedCampaignCharityId,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack sx={formContainerSx} spacing={2}>
      <Typography variant="h2" align="center">
        Select a charity to give {primaryDonorName}&apos;s ${couponDenomination} to
      </Typography>

      <FormControl sx={isMobile ? mobileCampaignCharitySelectionSx : desktopCampaignCharitySelectionSx}>
        <RadioGroup
          value={selectedCampaignCharityId}
          onChange={(e) => setSelectedCampaignCharityId(Number((e.target as HTMLInputElement).value))}
        >
          <Stack spacing={2}>
            {campaignCharities.map((campaignCharity, index) => (
              <Stack key={index} direction="row">
                <Radio sx={radioSx} value={campaignCharity.id} />

                <CampaignCharityCard campaignCharity={campaignCharity} />
              </Stack>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default CampaignCharitySelection;
