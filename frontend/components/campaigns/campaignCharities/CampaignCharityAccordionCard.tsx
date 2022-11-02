import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack, styled, Typography } from '@mui/material';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  accordianSx,
  charityDescriptionSx,
  charityGraphStackSx,
  charityImageSx,
  charityLogoSx,
  graphSx,
  stackSx,
} from '../../../styles/components/charities/CampaignCharityAccordianCard';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import SmallCompetingGraph from '../../charts/SmallCompetingGraph';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
}

const CustomAccordion = styled((props: AccordionProps) => <Accordion elevation={5} {...props} />)(() => ({
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': { borderRadius: '20px 20px 0 0' },
  '&:last-of-type': { borderRadius: '0 0 20px 20px' },
  '&:not(:first-child)': {
    marginTop: 0,
  },
}));

const CustomAccordianSummary = styled(AccordionSummary)(() => ({
  padding: 0,
  '&>.MuiAccordionSummary-content': { margin: 0 },
  '&>.MuiAccordionSummary-expandIconWrapper ': { margin: '8px' },
}));

const CampaignCharityAccordionCard = ({ campaignCharity }: Props) => {
  const primaryDonorDonationData = campaignCharity.primaryDonation;
  const secondaryDonorDonationData = campaignCharity.secondaryDonation;

  return (
    <CustomAccordion disableGutters sx={accordianSx}>
      <CustomAccordianSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center" sx={stackSx}>
          <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

          <Stack sx={charityGraphStackSx}>
            <Typography variant="h4">{campaignCharity.charity.name}</Typography>

            <SmallCompetingGraph
              overrideGraphSx={graphSx}
              leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
              rightLabel={`$${secondaryDonorDonationData.amount} from coupon recipients`}
              barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
            />
          </Stack>
        </Stack>
      </CustomAccordianSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          <Box sx={charityImageSx} component="img" src={campaignCharity.charity.imageBase64} />

          <Typography sx={charityDescriptionSx}>{campaignCharity.charity.description}</Typography>
        </Stack>
      </AccordionDetails>
    </CustomAccordion>
  );
};

export default CampaignCharityAccordionCard;
