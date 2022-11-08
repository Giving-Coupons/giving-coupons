import { Box, Skeleton, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import useSWR from 'swr';
import AnimatedNumber from '../components/AnimatedNumber';
import GlassCard from '../components/GlassCard';
import api from '../frontendApis';
import StatsAPI from '../frontendApis/stats';
import { numberSx, rootSx } from '../styles/statsStyles';
import { SummaryData } from '../types/summary';
import { Nullable } from '../types/utils';
import { theme } from '../utils/theme';

function Stats() {
  const { data: stats } = useSWR<Nullable<SummaryData>>(
    StatsAPI.STATS_URL,
    () => api.stats.getSummaryStats().then((r) => r.payload),
    { refreshInterval: 5000, refreshWhenHidden: true },
  );

  const isLoading = !stats;
  const heroSkeleton = <Skeleton variant="text" height="100%" sx={{ fontSize: theme.typography.hero.fontSize }} />;

  return (
    <Stack direction="row" spacing={2} sx={rootSx}>
      <Head>
        <title>STePS Statistics</title>
      </Head>

      <Box component="img" src="/logo-white.png" />

      <Stack spacing={2}>
        <GlassCard title="Total Amount Raised">
          {!isLoading ? (
            <Typography sx={numberSx}>
              <AnimatedNumber
                initialAmount={0}
                finalAmount={stats.totalContributionAmount}
                numToString={(n: number) => `$${n.toFixed(0)}`}
              />
            </Typography>
          ) : (
            heroSkeleton
          )}
        </GlassCard>

        <GlassCard title="Coupons Redeemed">
          {!isLoading ? (
            <Typography sx={numberSx}>
              <AnimatedNumber initialAmount={0} finalAmount={stats.totalRedemptionCount} />
            </Typography>
          ) : (
            heroSkeleton
          )}
        </GlassCard>
      </Stack>
    </Stack>
  );
}

export default Stats;
