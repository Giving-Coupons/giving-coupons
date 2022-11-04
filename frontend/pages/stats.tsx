import { Skeleton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import api from '../frontendApis';
import StatsAPI from '../frontendApis/stats';
import { rootSx } from '../styles/statsStyles';
import { SummaryData } from '../types/summary';
import { Nullable } from '../types/utils';
import { theme } from '../utils/theme';

function Stats() {
  const { data: stats } = useSWR<Nullable<SummaryData>>(
    StatsAPI.STATS_URL,
    () => api.stats.getSummaryStats().then((r) => r.payload),
    { refreshInterval: 5000, refreshWhenHidden: true },
  );

  const heroSkeleton = <Skeleton variant="text" sx={{ fontSize: theme.typography.hero.fontSize }} />;

  return (
    <Stack spacing={2} sx={rootSx}>
      <Stack>
        <Typography variant="h1">Total Amount Raised:</Typography>
        {stats ? <Typography variant="hero">${stats.totalContributionAmount}</Typography> : heroSkeleton}
      </Stack>
      <Stack>
        <Typography variant="h1">Total Coupon Redemptions:</Typography>
        {stats ? <Typography variant="hero">{stats.totalRedemptionCount}</Typography> : heroSkeleton}
      </Stack>
    </Stack>
  );
}

export default Stats;
