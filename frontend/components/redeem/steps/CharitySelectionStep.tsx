import { Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { formStepContainerSx, radioSx } from '../../../styles/components/redeem/RedeemStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import { CouponRedeemFormData } from '../../../types/coupons';
import { CouponSponsorship } from '../../../types/primaryDonor';
import { Nullable } from '../../../types/utils';
import { log } from '../../../utils/analytics';
import CampaignCharityCard from '../../campaigns/campaignCharities/CampaignCharityCard';
import CampaignCharityDialog from '../../campaigns/campaignCharities/CampaignCharityDialog';
import FormNavigationButtons from '../FormNavigationButtons';

interface Props {
  couponSponsorship?: CouponSponsorship;
  campaignCharities: CampaignCharityDonationPublicData[];
  name: keyof CouponRedeemFormData;
  activeStep: number;
  setActiveStep: (step: number) => void;
  minStep: number;
  maxStep: number;
}

const CharitySelectionStep = ({
  couponSponsorship,
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
        <Stack>
          <Typography variant="h2" align="center">
            {couponSponsorship
              ? `Select a charity to give ${couponSponsorship.primaryDonor.name}'s $${couponSponsorship.couponDenomination} to`
              : 'Select a charity to contribute to'}
          </Typography>

          <Typography variant="caption" align="center">
            The charts show the donations raised so far.
          </Typography>
        </Stack>

        <RadioGroup name={name} value={value ?? null} onChange={selectCharity}>
          <Stack spacing={4} width="100%" paddingRight={2}>
            {campaignCharities.map((campaignCharity, index) => (
              <Stack key={index} spacing={1} direction="row">
                <Radio sx={radioSx} value={campaignCharity.id} />

                <CampaignCharityCard
                  campaignCharity={campaignCharity}
                  onClick={() => {
                    setTouched(true);
                    setValue(campaignCharity.id, true);
                  }}
                  handleOpenInfoCard={() => {
                    log('[CharitySelectionStep] Click card', {
                      campaignCharityId: campaignCharity.id,
                      charity: campaignCharity.charity.name,
                    });
                    setOpenCharityDialogId(campaignCharity.id);
                  }}
                />

                <CampaignCharityDialog
                  campaignCharity={campaignCharity}
                  open={openCharityDialogId === campaignCharity.id}
                  handleClose={() => {
                    log('[CharitySelectionStep] Close card', {
                      campaignCharityId: campaignCharity.id,
                      charity: campaignCharity.charity.name,
                    });
                    setOpenCharityDialogId(null);
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>

      <FormNavigationButtons
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
