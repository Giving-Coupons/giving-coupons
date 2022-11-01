import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  accordianSx,
  charityDesktopDescriptionSx,
  charityDesktopImageSx,
  charityGraphStackSx,
  charityLogoSx,
  charityMobileDescriptionSx,
  charityMobileImageSx,
  graphSx,
} from '../../../styles/components/charities/CampaignCharityAccordianCard';
import { CampaignCharityDonationPublicData } from '../../../types/campaignCharities';
import SmallCompetingGraph from '../../charts/SmallCompetingGraph';

interface Props {
  campaignCharity: CampaignCharityDonationPublicData;
}

const CampaignCharityAccordionCard = ({ campaignCharity }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const primaryDonorDonationData = campaignCharity.primaryDonation;
  const secondaryDonorDonationData = campaignCharity.secondaryDonation;

  return (
    <Accordion sx={accordianSx}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <Box sx={charityLogoSx} component="img" src={campaignCharity.charity.logoBase64} />

          <Stack sx={charityGraphStackSx}>
            <Typography variant="h4">{campaignCharity.charity.name}</Typography>

            <SmallCompetingGraph
              overrideGraphSx={graphSx}
              leftLabel={`$${primaryDonorDonationData.amount} from ${campaignCharity.primaryDonor.name}`}
              rightLabel={`$${secondaryDonorDonationData.amount} from people like you`}
              barFractions={[primaryDonorDonationData.fraction, secondaryDonorDonationData.fraction]}
            />
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
          <Box
            sx={isMobile ? charityMobileImageSx : charityDesktopImageSx}
            component="img"
            src={campaignCharity.charity.imageBase64}
          />

          <Typography sx={isMobile ? charityMobileDescriptionSx : charityDesktopDescriptionSx}>
            {campaignCharity.charity.description}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default CampaignCharityAccordionCard;
