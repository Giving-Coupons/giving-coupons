import { FormControl, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { radioSx } from '../../../styles/components/redeem/RedeemStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityCard from '../../campaigns/campaignCharities/CampaignCharityCard';
import { Nullable } from '../../../types/utils';
import { ChangeEvent, useState } from 'react';
import CampaignCharityDialog from '../../campaigns/campaignCharities/CampaignCharityDialog';
import { CouponRedeemFormData } from '../../../types/coupons';
import { useField } from 'formik';
import RedeemFormButtons from '../RedeemFormButtons';

interface Props {
  primaryDonorName: string;
  couponDenomination: number;
  campaignCharities: CampaignCharityDonationPublicData[];
  name: keyof CouponRedeemFormData;
  activeStep: number;
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  minStep: number;
  maxStep: number;
}

const CharitySelectionStep = ({
  primaryDonorName,
  couponDenomination,
  campaignCharities,
  name,
  activeStep,
  setActiveStep,
  minStep,
  maxStep,
}: Props) => {
  const [openCharityDialogId, setOpenCharityDialogId] = useState<Nullable<number>>(null);
  const [, { value, error, touched }, { setValue, setTouched }] = useField(name);
  const selectCharity = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setValue(Number((e.target as HTMLInputElement).value), true);
  };

  return (
    <Stack component="div" spacing={4} width="100%" alignItems="center">
      <Typography variant="h2" align="center">
        Select a charity to give {primaryDonorName}&apos;s ${couponDenomination} to
      </Typography>

      <FormControl fullWidth>
        <RadioGroup name={name} value={value ?? null} onChange={selectCharity}>
          <Stack spacing={2}>
            {campaignCharities.map((campaignCharity, index) => (
              <Stack key={index} direction="row">
                <Radio sx={radioSx} value={campaignCharity.id} />

                <CampaignCharityCard
                  campaignCharity={campaignCharity}
                  onClick={() => setOpenCharityDialogId(campaignCharity.id)}
                />

                <CampaignCharityDialog
                  campaignCharity={campaignCharity}
                  open={openCharityDialogId === campaignCharity.id}
                  handleClose={() => setOpenCharityDialogId(null)}
                />
              </Stack>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>

      <RedeemFormButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        minStep={minStep}
        maxStep={maxStep}
        shouldDisablePrimaryButton={!touched || !!error}
      />
    </Stack>
  );
};

export default CharitySelectionStep;
