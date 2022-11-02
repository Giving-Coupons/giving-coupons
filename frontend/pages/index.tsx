import { Avatar, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  desktopDescriptionTextSx,
  desktopHeadlineTextContainerSx,
  desktopHeadlineTextSx,
  headlineBackgroundSx,
  highlightedTextSx,
  mobileDescriptionTextSx,
  mobileHeadlineTextContainerSx,
  mobileHeadlineTextSx,
  sectionSx,
  desktopHeadlineScreenImageSx,
  mobileHeadlineScreenImageSx,
  mobileHeadlineImageContainerSx,
  statisticsItemsContainerSx,
  statisticsSectionSx,
  statisticsItemSx,
  statisticsIconSx,
  statisticsItemCardSx,
  statisticsIconAvatarSx,
  mobileTextContainerSx,
  desktopRightTextContainerSx,
  mobileInstructionsTitleTextSx,
  desktopInstructionsTitleTextSx,
  mobileInstructionsDescriptionTextSx,
  desktopRightInstructionsDescriptionTextSx,
  mobileInstructionsImageSx,
  desktopInstructionsImageSx,
  startCampaignImageSx,
  desktopLeftTextContainerSx,
  desktopLeftInstructionsDescriptionTextSx,
  instructionsImageContainerSx,
  instructionsContainerSx,
  statisticsContainerSx,
  statisticsMainTextSx,
  callToActionItemSx,
  callToActionSectionSx,
  callToActionItemContainerSx,
  callToActionIconAvatarSx,
  callToActionIconSx,
  callToActionLinkSx,
  callToActionLinkIconSx,
  sectionHeaderSx,
  copyRightIconSx,
  desktopFooterSectionSx,
  footerButtonSx,
  mobileFooterSectionSx,
} from '../styles/indexStyles';
import { combineSxProps } from '../utils/types';
import Typed from 'react-typed';
import Button from '../components/generic/Button';
import { useRouter } from 'next/router';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { ReactNode } from 'react';
import { theme } from '../utils/theme';
import CampaignIcon from '@mui/icons-material/Campaign';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

interface StatisticItemProps {
  statistic: string;
  icon: ReactNode;
  description: string;
}

const StatisticItem = ({ statistic, icon, description }: StatisticItemProps) => {
  return (
    <Grid sx={statisticsItemSx} item xs={12} md={4}>
      <Stack sx={statisticsItemCardSx} component="div" spacing={1}>
        <Avatar sx={statisticsIconAvatarSx}>{icon}</Avatar>

        <Typography sx={statisticsMainTextSx}>{statistic}</Typography>

        <Typography color={theme.palette.grey[800]}>{description}</Typography>
      </Stack>
    </Grid>
  );
};

interface ActionButtonItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText: string;
  link: string;
}

const ActionButtonItem = ({ icon, title, description, actionText, link }: ActionButtonItemProps) => {
  return (
    <Grid sx={callToActionItemSx} item xs={12} md={6}>
      <Stack sx={callToActionItemContainerSx} component="div" spacing={1}>
        <Avatar sx={callToActionIconAvatarSx}>{icon}</Avatar>

        <Typography variant="h3" color="primary">
          {title}
        </Typography>

        <Typography variant="body2" color={theme.palette.grey[800]}>
          {description}
        </Typography>

        <Link href={link}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" color="primary" sx={callToActionLinkSx}>
              {actionText} <ArrowRightIcon sx={callToActionLinkIconSx} />
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Grid>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <Stack sx={sectionHeaderSx} alignItems="center">
    <Typography variant="h1" align="center">
      {title}
    </Typography>

    {subtitle && (
      <Typography color={theme.palette.grey[700]} align="center">
        {subtitle}
      </Typography>
    )}
  </Stack>
);

const statistics: StatisticItemProps[] = [
  {
    statistic: '$1600',
    icon: <VolunteerActivismIcon sx={statisticsIconSx} />,
    description: 'Raised for charities',
  },
  { statistic: '160', icon: <LocalActivityIcon sx={statisticsIconSx} />, description: 'Coupons distributed' },
  { statistic: '8', icon: <Diversity1Icon sx={statisticsIconSx} />, description: 'Charities supported' },
];

const Home: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const headlineTextContainerSx = isMobile ? mobileHeadlineTextContainerSx : desktopHeadlineTextContainerSx;
  const headlineTextSx = isMobile ? mobileHeadlineTextSx : desktopHeadlineTextSx;
  const descriptionTextSx = isMobile ? mobileDescriptionTextSx : desktopDescriptionTextSx;
  const headlineScreenImageSx = isMobile ? mobileHeadlineScreenImageSx : desktopHeadlineScreenImageSx;
  const rightTextContainerSx = isMobile ? mobileTextContainerSx : desktopRightTextContainerSx;
  const instructionsTitleTextSx = isMobile ? mobileInstructionsTitleTextSx : desktopInstructionsTitleTextSx;
  const rightInstructionsDescriptionTextSx = isMobile
    ? mobileInstructionsDescriptionTextSx
    : desktopRightInstructionsDescriptionTextSx;
  const instructionsImageSx = isMobile ? mobileInstructionsImageSx : desktopInstructionsImageSx;
  const leftTextContainerSx = isMobile ? mobileTextContainerSx : desktopLeftTextContainerSx;
  const leftInstructionsDescriptionTextSx = isMobile
    ? mobileInstructionsDescriptionTextSx
    : desktopLeftInstructionsDescriptionTextSx;

  const buttonProps: ActionButtonItemProps[] = [
    {
      icon: <VolunteerActivismIcon sx={callToActionIconSx} />,
      title: 'Donate to charities',
      description: 'Feel strongly about any causes? Contribute directly to charities through our campaigns.',
      actionText: 'Donate now',
      link: '/campaigns',
    },
    {
      icon: <CampaignIcon sx={callToActionIconSx} />,
      title: 'Start a campaign',
      description:
        'Empower your loved ones to improve the lives of others. Sponsor a coupon for them to donate to a charity of their choice.',
      actionText: 'Start now',
      link: '/interest',
    },
  ];

  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>

      <Stack component="main" alignItems="center">
        {isMobile ? (
          <Box sx={headlineBackgroundSx} component="img" src="/landing-page/mobile-header-background.png" />
        ) : (
          <Box sx={headlineBackgroundSx} component="img" src="/landing-page/desktop-header-background.png" />
        )}

        <Grid sx={sectionSx} container>
          <Grid sx={headlineTextContainerSx} item xs={12} md={8}>
            <Typography sx={headlineTextSx}>Giving the</Typography>

            <Typography sx={combineSxProps(headlineTextSx, highlightedTextSx)}>Gift of Giving</Typography>

            <Typography sx={descriptionTextSx}>Experience and share the joy of giving by</Typography>

            <Typed
              style={descriptionTextSx}
              strings={[
                'empowering others to give',
                'learning how your donations helps charities',
                'directing donations to beneficiaries',
                'donating to charities',
              ]}
              typeSpeed={40}
              loop
            />

            <br />
            <br />

            <Button actionType="primary" onClick={() => router.push('/campaigns')}>
              Explore our campaigns now
            </Button>
          </Grid>

          <Grid item xs={12} md={4} sx={isMobile ? mobileHeadlineImageContainerSx : {}}>
            <Box sx={headlineScreenImageSx} component="img" src="/landing-page/redeem-screen.png" />
          </Grid>
        </Grid>

        <Stack sx={instructionsContainerSx} component="div">
          <Grid sx={sectionSx} container>
            {!isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, startCampaignImageSx)}
                  component="img"
                  src="/landing-page/start-campaign-screen.png"
                />
              </Grid>
            )}

            <Grid sx={rightTextContainerSx} item xs={12} md={6}>
              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>Empower</Typography>

              <Typography sx={instructionsTitleTextSx}>others to give</Typography>

              <Typography sx={rightInstructionsDescriptionTextSx}>
                Commit a donation amount to one or more charities by starting a campaign on our site. The amount will be
                split into coupons. Give the coupons to the people around you. Empower them to choose the donation
                beneficiaries through the coupons.
              </Typography>

              <br />

              <Button actionType="primary" onClick={() => router.push('/interest')}>
                Start a campaign
              </Button>
            </Grid>

            {isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, startCampaignImageSx)}
                  component="img"
                  src="/landing-page/start-campaign-screen.png"
                />
              </Grid>
            )}
          </Grid>

          <Grid sx={sectionSx} container>
            <Grid sx={leftTextContainerSx} item xs={12} md={6}>
              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>Direct</Typography>

              <Typography sx={instructionsTitleTextSx}>donations to help charities</Typography>

              <Typography sx={leftInstructionsDescriptionTextSx}>
                If you received a coupon, scan the QR code to choose which charity benefits from the coupon. Learn about
                their cause and impact along the way. Add a personal contribution to make a greater impact.
              </Typography>

              <br />

              <Button actionType="primary" onClick={() => router.push('/campaigns')}>
                Explore the impact by coupon recipients
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
              <Box sx={instructionsImageSx} component="img" src="/landing-page/coupons.png" />
            </Grid>
          </Grid>

          <Grid sx={sectionSx} container>
            {!isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, startCampaignImageSx)}
                  component="img"
                  src="/landing-page/contribute.png"
                />
              </Grid>
            )}

            <Grid sx={rightTextContainerSx} item xs={12} md={6}>
              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>Contribute</Typography>

              <Typography sx={instructionsTitleTextSx}>directly</Typography>

              <Typography sx={rightInstructionsDescriptionTextSx}>
                Donate directly to charities through our campaigns. Make a difference in someone&apos;s life today.
              </Typography>

              <br />

              <Button actionType="primary" onClick={() => router.push('/campaigns')}>
                Explore our campaigns
              </Button>
            </Grid>

            {isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, startCampaignImageSx)}
                  component="img"
                  src="/landing-page/contribute.png"
                />
              </Grid>
            )}
          </Grid>
        </Stack>

        <Box sx={statisticsContainerSx}>
          <Stack sx={combineSxProps(sectionSx, statisticsSectionSx)} component="div">
            <Typography variant="h1" color="#FFFFFF">
              Our impact
            </Typography>

            <Grid sx={statisticsItemsContainerSx} spacing={2} container>
              {statistics.map((statisticData, index) => (
                <StatisticItem
                  key={index}
                  statistic={statisticData.statistic}
                  icon={statisticData.icon}
                  description={statisticData.description}
                />
              ))}
            </Grid>
          </Stack>
        </Box>

        <Stack sx={combineSxProps(sectionSx, callToActionSectionSx)} component="div">
          <SectionHeader
            title="Join Our Mission"
            subtitle="Feeling inspired? Join our mission through one of these ways."
          />

          <Grid container rowSpacing={2}>
            {buttonProps.map((buttonProp, index) => (
              <ActionButtonItem
                key={index}
                icon={buttonProp.icon}
                title={buttonProp.title}
                description={buttonProp.description}
                actionText={buttonProp.actionText}
                link={buttonProp.link}
              />
            ))}
          </Grid>
        </Stack>

        <Stack
          component="div"
          sx={isMobile ? mobileFooterSectionSx : desktopFooterSectionSx}
          direction={isMobile ? 'column' : 'row'}
          spacing={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <CopyrightIcon sx={copyRightIconSx} />

            <Typography variant="body2" color={theme.palette.grey[600]}> Giving Coupons 2022. All Rights Reserved.</Typography>
          </Stack>

          <Stack component="div" direction="row" spacing={2}>
            <Tooltip title="Instagram">
              {/*TODO: Link to instagram*/}
              <InstagramIcon sx={footerButtonSx} />
            </Tooltip>

            <Tooltip title="Github">
              <GitHubIcon
                sx={footerButtonSx}
                onClick={() => router.push('https://github.com/Giving-Coupons/giving-coupons')}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
