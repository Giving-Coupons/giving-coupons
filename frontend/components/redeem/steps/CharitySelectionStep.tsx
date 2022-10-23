import { Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { formStepContainerSx, radioSx } from '../../../styles/components/redeem/RedeemStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import CampaignCharityCard from '../../campaigns/campaignCharities/CampaignCharityCard';
import { Nullable } from '../../../types/utils';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
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
  setActiveStep: Dispatch<SetStateAction<number>>;
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
    <Stack sx={formStepContainerSx} component="div" spacing={4}>
      <Stack spacing={2} width="100%">
        <Typography variant="h2" align="center">
          Select a charity to give {primaryDonorName}&apos;s ${couponDenomination}
        </Typography>

        <RadioGroup name={name} value={value ?? null} onChange={selectCharity}>
          <Stack spacing={4} width="100%">
            {campaignCharities.map((campaignCharity, index) => (
              <Stack key={index} spacing={1} direction="row">
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
      </Stack>

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
