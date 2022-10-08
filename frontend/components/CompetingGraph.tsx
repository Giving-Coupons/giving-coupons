import { Box, Stack, SxProps } from '@mui/system';
import { Typography } from '@mui/material';
import HorizontalBarGraph from './HorizontalBarGraph';
import { topGraphLegendSx, bottomGraphLegendSx, graphLabelSx } from '../styles/components/CompetingGraphStyles';

interface Props {
  topLabels: string[];
  bottomLabels: string[];
  barFractions: number[];
  overrideGraphSx?: SxProps;
}

const CompetingGraph = ({ topLabels, bottomLabels, barFractions, overrideGraphSx = [] }: Props) => {
  return (
    <Stack component="div" spacing={0.5}>
      <Box sx={topGraphLegendSx}>
        {topLabels.map((label, index) => (
          <Typography key={index} sx={graphLabelSx} variant="caption">
            {label}
          </Typography>
        ))}
      </Box>

      <HorizontalBarGraph barFractions={barFractions} overrideGraphSx={overrideGraphSx} />

      <Box sx={bottomGraphLegendSx}>
        {bottomLabels.map((label, index) => (
          <Typography key={index} sx={graphLabelSx} variant="caption">
            {label}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default CompetingGraph;
