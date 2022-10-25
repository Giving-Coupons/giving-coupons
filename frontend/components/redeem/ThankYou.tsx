import { Box, Grid, Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import orangeThankYou from '../../assets/orangeThankYouLottie.json';
import { buttonSx, lottieContainerSx, lottieFrameSx, stackSx } from '../../styles/redeem/thankYou';
import CampaignIcon from '../icons/CampaignIcon';
import ContributeIcon from '../icons/ContributeIcon';
import ExploreIcon from '../icons/ExploreIcon';
import CallToActionButton from './CallToActionButton';

type Props = {
  campaignId?: number;
};

const ThankYou = ({ campaignId }: Props) => {
  const router = useRouter();

  const buttonProps = [
    ...(campaignId
      ? [
          {
            icon: <ContributeIcon />,
            title: 'Contribute more',
            description: 'Have another charity in mind? Contribute more to this campaign.',
            onClick: () => router.push(`/campaigns/${campaignId}/contribute`),
          },
        ]
      : []),
    {
      icon: <ExploreIcon />,
      title: 'Explore other campaigns',
      description: 'Feel strongly about any causes? Contribute directly to other campaigns.',
      onClick: () => router.push('/campaigns'),
    },
    {
      icon: <CampaignIcon />,
      title: 'Start a campaign',
      description: 'Pay it forward by sponsoring others. Empower your loved ones to improve the lives of others..',
      onClick: () => router.push('/interest'),
    },
  ];

  return (
    <Stack component="main" maxWidth="md" spacing={2} sx={stackSx}>
      <Box sx={lottieContainerSx}>
        <Box sx={lottieFrameSx}>
          <Lottie autoPlay loop={false} animationData={orangeThankYou} />
        </Box>
      </Box>

      <Typography variant="h3" textAlign="center">
        Your gift will not just improve lives, it will transform futures.
      </Typography>

      <Grid container spacing={1}>
        {buttonProps.map((props, index) => (
          <Grid sx={buttonSx} key={index} item xs={12} md={12 / buttonProps.length}>
            <CallToActionButton {...props} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
export default ThankYou;
