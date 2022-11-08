import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CampaignIcon from '@mui/icons-material/Campaign';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Avatar, Grid, Skeleton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Typed from 'react-typed';
import useSWR from 'swr';
import Button from '../components/generic/Button';
import api from '../frontendApis';
import StatsAPI from '../frontendApis/stats';
import {
  callToActionIconAvatarSx,
  callToActionIconSx,
  callToActionItemContainerSx,
  callToActionItemSx,
  callToActionLinkIconSx,
  callToActionLinkSx,
  callToActionSectionSx,
  copyRightIconSx,
  desktopDescriptionTextSx,
  desktopFooterSectionSx,
  desktopHeadlineBackgroundSx,
  desktopHeadlineImageContainerSx,
  desktopHeadlineScreenImageSx,
  desktopHeadlineTextContainerSx,
  desktopHeadlineTextSx,
  desktopInstructionsImageContainerSx,
  desktopInstructionsImageSx,
  desktopInstructionsTitleTextSx,
  desktopLeftInstructionsDescriptionTextSx,
  desktopLeftTextContainerSx,
  desktopRightInstructionsDescriptionTextSx,
  desktopRightTextContainerSx,
  desktopSectionSx,
  footerButtonSx,
  givingCouponsInlineLogoSx,
  highlightedTextSx,
  instructionsContainerSx,
  instructionsImageShadowSx,
  mobileDescriptionTextSx,
  mobileFooterSectionSx,
  mobileHeadlineBackgroundSx,
  mobileHeadlineImageContainerSx,
  mobileHeadlineScreenImageSx,
  mobileHeadlineTextContainerSx,
  mobileHeadlineTextSx,
  mobileInstructionsDescriptionTextSx,
  mobileInstructionsImageContainerSx,
  mobileInstructionsImageSx,
  mobileInstructionsTitleTextSx,
  mobileSectionSx,
  mobileTextBoxSx,
  mobileTextContainerSx,
  sectionHeaderSx,
  sectionSeparationLineSx,
  statisticsContainerSx,
  statisticsIconAvatarSx,
  statisticsIconSx,
  statisticsItemCardSx,
  statisticsItemsContainerSx,
  statisticsItemSx,
  statisticsMainTextSx,
  statisticsSectionSx,
} from '../styles/indexStyles';
import { LandingPageStatsData } from '../types/summary';
import { Nullable } from '../types/utils';
import { log } from '../utils/analytics';
import { theme } from '../utils/theme';
import { combineSxProps } from '../utils/types';

interface StatisticItemProps {
  statistic?: string;
  icon: ReactNode;
  description: string;
}

const StatisticItem = ({ statistic, icon, description }: StatisticItemProps) => {
  return (
    <Grid sx={statisticsItemSx} item xs={12} md={4}>
      <Stack sx={statisticsItemCardSx} component="div" spacing={1}>
        <Avatar sx={statisticsIconAvatarSx}>{icon}</Avatar>

        {statistic ? (
          <Typography sx={statisticsMainTextSx}>{statistic}</Typography>
        ) : (
          <Skeleton width="50%" height="60px" />
        )}

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

        <Link
          href={link}
          onClick={() => {
            log(`[Landing-JoinMission] Click ${title}`);
          }}
        >
          <Stack component="div" direction="row" alignItems="center">
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
  subtitle?: ReactNode[];
}

const SectionHeader = ({ title, subtitle = [] }: SectionHeaderProps) => (
  <Stack component="div" sx={sectionHeaderSx} alignItems="center">
    <Typography variant="h1" align="center">
      {title}
    </Typography>

    {subtitle.length > 0 && (
      <Typography color={theme.palette.grey[700]} align="center">
        {subtitle.map((item, index) => (
          <Box key={index} component="span">
            {item}
          </Box>
        ))}
      </Typography>
    )}
  </Stack>
);

const Home: NextPage = () => {
  const { data: stats } = useSWR<Nullable<LandingPageStatsData>>(StatsAPI.STATS_URL, () =>
    api.stats.getLandingPageStats().then((r) => r.payload),
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const sectionSx = isMobile ? mobileSectionSx : desktopSectionSx;
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
  const instructionsImageContainerSx = isMobile
    ? mobileInstructionsImageContainerSx
    : desktopInstructionsImageContainerSx;

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

  const statistics: StatisticItemProps[] = [
    {
      statistic: `$${stats?.totalContributionAmount}`,
      icon: <VolunteerActivismIcon sx={statisticsIconSx} />,
      description: 'Raised for charities',
    },
    {
      statistic: `${stats?.totalRedemptionCount}`,
      icon: <LocalActivityIcon sx={statisticsIconSx} />,
      description: 'Coupons redeemed',
    },
    {
      statistic: `${stats?.totalCharitiesSupported}`,
      icon: <Diversity1Icon sx={statisticsIconSx} />,
      description: 'Charities supported',
    },
  ];

  return (
    <Box>
      <Head>
        <title>Giving Coupons</title>
      </Head>

      <Stack component="main" alignItems="center">
        {isMobile ? (
          <Box sx={mobileHeadlineBackgroundSx} component="img" src="/landing-page/mobile-header-background.png" />
        ) : (
          <Box sx={desktopHeadlineBackgroundSx} component="img" src="/landing-page/desktop-header-background.png" />
        )}

        <Grid sx={sectionSx} container>
          <Grid sx={headlineTextContainerSx} item xs={12} md={8}>
            <Box sx={isMobile ? mobileTextBoxSx : {}}>
              <Typography sx={headlineTextSx}>Giving the</Typography>

              <Typography sx={combineSxProps(headlineTextSx, highlightedTextSx)}>Gift of Giving</Typography>

              <Typography sx={descriptionTextSx}>Experience and share the joy of giving by</Typography>

              <Typed
                style={descriptionTextSx}
                strings={[
                  'empowering others to give',
                  'learning how your donations help charities',
                  'directing donations to beneficiaries',
                  'donating to charities',
                ]}
                typeSpeed={40}
                loop
              />

              <br />
              <br />

              <Button
                actionType="primary"
                onClick={() => {
                  log("[Landing] Click top 'Explore campaigns'");
                  router.push('/campaigns');
                }}
              >
                Explore our campaigns now
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={isMobile ? mobileHeadlineImageContainerSx : desktopHeadlineImageContainerSx}
            height="100%"
          >
            <Box sx={headlineScreenImageSx} component="img" src="/landing-page/redeem-screen.png" />
          </Grid>
        </Grid>

        <Box sx={sectionSeparationLineSx} />

        <Stack sx={instructionsContainerSx} component="div">
          <SectionHeader
            title="How it works"
            subtitle={[
              'This is how ',
              <Box key="inline-logo" sx={givingCouponsInlineLogoSx} component="img" src="/inline-logo.png" />,
              ' empowers people to give. Join us at any step.',
            ]}
          />

          <Grid sx={sectionSx} container>
            {!isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, instructionsImageShadowSx)}
                  component="img"
                  src="/landing-page/start-campaign-screen.png"
                />
              </Grid>
            )}

            <Grid sx={rightTextContainerSx} item xs={12} md={6}>
              <Typography sx={instructionsTitleTextSx}>01. Start the</Typography>

              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>chain of giving</Typography>

              <br />

              <Typography sx={rightInstructionsDescriptionTextSx}>
                Pledge to donate a sum of money to one or more charities by starting a campaign on{' '}
                <Box sx={givingCouponsInlineLogoSx} component="img" src="/inline-logo.png" />.
              </Typography>

              <br />

              <Button
                actionType="primary"
                onClick={() => {
                  log("[Landing] Click 'Start a campaign'");
                  router.push('/interest');
                }}
              >
                Start a campaign
              </Button>
            </Grid>

            {isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, instructionsImageShadowSx)}
                  component="img"
                  src="/landing-page/start-campaign-screen.png"
                />
              </Grid>
            )}
          </Grid>

          <Grid sx={sectionSx} container>
            <Grid sx={leftTextContainerSx} item xs={12} md={6}>
              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>02. Empower</Typography>

              <Typography sx={instructionsTitleTextSx}>others to give</Typography>

              <br />

              <Typography sx={leftInstructionsDescriptionTextSx}>
                <Box sx={givingCouponsInlineLogoSx} component="img" src="/inline-logo.png" /> will split the pledged
                amount into coupons. Coupons are distributed to the public or organisations.
              </Typography>

              <br />

              <Button
                actionType="primary"
                onClick={() => {
                  log("[Landing] Click 'Explore how coupons are used'");
                  router.push('/campaigns');
                }}
              >
                Explore how coupons are used
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
              <Box sx={instructionsImageSx} component="img" src="/landing-page/coupons.png" />
            </Grid>
          </Grid>

          <Grid sx={sectionSx} container>
            {!isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box sx={instructionsImageSx} component="img" src="/landing-page/select-charity.png" />
              </Grid>
            )}

            <Grid sx={rightTextContainerSx} item xs={12} md={6}>
              <Typography sx={instructionsTitleTextSx} align="right">
                03. Direct donations to
              </Typography>

              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>help charities</Typography>

              <br />

              <Typography sx={rightInstructionsDescriptionTextSx}>
                If you received a coupon, redeem it to choose where the money goes to. Learn about the charities and
                their impact during the redemption process.
              </Typography>

              <br />

              <Button
                actionType="primary"
                onClick={() => {
                  log("[Landing] Click 'Explore impact'");
                  router.push('/campaigns');
                }}
              >
                Explore the impact by coupon recipients
              </Button>
            </Grid>

            {isMobile && (
              <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
                <Box
                  sx={combineSxProps(instructionsImageSx, instructionsImageShadowSx)}
                  component="img"
                  src="/landing-page/select-charity.png"
                />
              </Grid>
            )}
          </Grid>

          <Grid sx={sectionSx} container>
            <Grid sx={leftTextContainerSx} item xs={12} md={6}>
              <Typography sx={combineSxProps(instructionsTitleTextSx, highlightedTextSx)}>04. Extend</Typography>

              <Typography sx={instructionsTitleTextSx}>the chain of giving</Typography>

              <br />

              <Typography sx={leftInstructionsDescriptionTextSx}>
                Add a personal contribution during the coupon redemption process. Or donate directly to charities
                through our campaigns.
              </Typography>

              <br />

              <Button
                actionType="primary"
                onClick={() => {
                  log("[Landing] Click bottom 'Explore campaigns'");
                  router.push('/campaigns');
                }}
              >
                Explore our campaigns
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={instructionsImageContainerSx}>
              <Box
                sx={combineSxProps(instructionsImageSx, instructionsImageShadowSx)}
                component="img"
                src="/landing-page/contribute.png"
              />
            </Grid>
          </Grid>
        </Stack>

        <Box sx={sectionSeparationLineSx} />

        <Stack sx={statisticsContainerSx} component="div">
          <Stack sx={combineSxProps(sectionSx, statisticsSectionSx)} spacing={4}>
            <SectionHeader title="Our impact" />

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
        </Stack>

        <Box sx={sectionSeparationLineSx} />

        <Stack sx={combineSxProps(sectionSx, callToActionSectionSx)} spacing={4} component="div">
          <SectionHeader
            title="Join Our Mission"
            subtitle={['Feeling inspired? Join our mission through one of these ways.']}
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
          <Stack component="div" direction="row" alignItems="center" spacing={1}>
            <CopyrightIcon sx={copyRightIconSx} />

            <Typography variant="body2" color={theme.palette.grey[600]}>
              {' '}
              Giving Coupons 2022. All Rights Reserved.
            </Typography>
          </Stack>

          <Stack component="div" direction="row" spacing={2}>
            <Tooltip title="Instagram">
              <InstagramIcon
                sx={footerButtonSx}
                onClick={() => {
                  log('Landing_clickInstagram');
                  window.open('https://www.instagram.com/givingcoupons/?igshid=YmMyMTA2M2Y%3D', '_blank');
                }}
              />
            </Tooltip>

            <Tooltip title="Github">
              <GitHubIcon
                sx={footerButtonSx}
                onClick={() => {
                  log('Landing_clickGithub');
                  window.open('https://github.com/Giving-Coupons/giving-coupons', '_blank');
                }}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
