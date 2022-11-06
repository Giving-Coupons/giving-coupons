import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  accordionSx,
  charityDescriptionSx,
  charityGraphStackSx,
  charityImageSx,
  charityLogoSx,
  graphSx,
  stackSx,
} from '../../../styles/components/charities/CampaignCharityAccordionCardStyles';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import SmallCompetingGraph from '../../charts/SmallCompetingGraph';
import Button from '../../generic/Button';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
}

const CustomAccordion = styled((props: AccordionProps) => <Accordion {...props} />)(() => ({
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': { borderRadius: '20px 20px 0 0' },
  '&:last-of-type': { borderRadius: '0 0 20px 20px' },
  '&:not(:first-of-type)': {
    marginTop: 0,
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid lightGray',
  },
  boxShadow: 'none',
}));

const CustomAccordionSummary = styled(AccordionSummary)(() => ({
  padding: 0,
  '&>.MuiAccordionSummary-content': { margin: 0 },
  '&>.MuiAccordionSummary-expandIconWrapper ': { margin: '8px' },
}));

const CampaignCharityAccordionCard = ({ campaignCharity }: Props) => {
  const primaryDonorDonationData = campaignCharity.primaryDonation;
  const secondaryDonorDonationData = campaignCharity.secondaryDonation;

  return (
    <CustomAccordion disableGutters sx={accordionSx}>
      <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center" sx={stackSx}>
          <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoUrl} />

          <Stack sx={charityGraphStackSx}>
            <Typography variant="h4">{campaignCharity.charity.name}</Typography>

            <SmallCompetingGraph
              overrideGraphSx={graphSx}
              leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
              rightLabel={`$${secondaryDonorDonationData.amount} from the public`}
              barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
            />
          </Stack>
        </Stack>
      </CustomAccordionSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          <Typography variant="h4">About the charity</Typography>

          <Divider />

          <Box sx={charityImageSx} component="img" src={campaignCharity.charity.imageUrl} />

          <Typography variant="body2" sx={charityDescriptionSx}>
            {campaignCharity.charity.description}
          </Typography>

          <Divider />

          <Button
            actionType="secondary"
            fullWidth
            onClick={() => {
              window.open(campaignCharity.charity.websiteUrl, '_blank');
            }}
          >
            Visit Charity Website
          </Button>
        </Stack>
      </AccordionDetails>
    </CustomAccordion>
  );
};

export default CampaignCharityAccordionCard;
