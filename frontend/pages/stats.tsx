import { Skeleton, Stack, Typography, Box } from '@mui/material';
import useSWR from 'swr';
import api from '../frontendApis';
import StatsAPI from '../frontendApis/stats';
import { rootSx, numberSx, ctaSx, leftSectionSx } from '../styles/statsStyles';
import { SummaryData } from '../types/summary';
import { Nullable } from '../types/utils';
import { theme } from '../utils/theme';
import GlassCard from '../components/GlassCard';
import AnimatedNumber from '../components/AnimatedNumber';

function Stats() {
  const { data: stats } = useSWR<Nullable<SummaryData>>(
    StatsAPI.STATS_URL,
    () => api.stats.getSummaryStats().then((r) => r.payload),
    { refreshInterval: 5000, refreshWhenHidden: true },
  );

  const heroSkeleton = <Skeleton variant="text" sx={{ fontSize: theme.typography.hero.fontSize }} />;

  return (
    <Stack direction="row" spacing={2} sx={rootSx}>
      <Box sx={leftSectionSx}>
        <Typography sx={ctaSx} align="left">
          Ask one of our members for a coupon
        </Typography>
      </Box>
      <Stack spacing={2}>
        <GlassCard title="Total Amount Raised">
          {stats ? (
            <Typography sx={numberSx}>
              <AnimatedNumber initialAmount={0} finalAmount={stats.totalContributionAmount} />
            </Typography>
          ) : (
            heroSkeleton
          )}
        </GlassCard>
        <GlassCard title="Coupons Redeemed">
          {stats ? (
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
