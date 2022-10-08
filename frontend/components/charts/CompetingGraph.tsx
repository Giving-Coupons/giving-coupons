import { Box, Stack, SxProps } from '@mui/system';
import { Typography } from '@mui/material';
import HorizontalBarGraph from './HorizontalBarGraph';
import {
  topGraphLegendSx,
  bottomGraphLegendSx,
  graphLabelSx,
} from '../../styles/components/charts/CompetingGraphStyles';

interface Props {
  topLabelTitle?: string;
  topLabels: string[];
  bottomLabelTitle?: string;
  bottomLabels: string[];
  barFractions: number[];
  overrideGraphSx?: SxProps;
}

const CompetingGraph = ({
  topLabelTitle,
  topLabels,
  bottomLabelTitle,
  bottomLabels,
  barFractions,
  overrideGraphSx = [],
}: Props) => {
  return (
    <Stack component="div" spacing={0.5}>
      <Box sx={topGraphLegendSx}>
        {topLabelTitle && (
          <Typography sx={graphLabelSx} variant="h4">
            {topLabelTitle}
          </Typography>
        )}

        {topLabels.map((label, index) => (
          <Typography key={index} sx={graphLabelSx} variant="caption">
            {label}
          </Typography>
        ))}
      </Box>

      <HorizontalBarGraph barFractions={barFractions} overrideGraphSx={overrideGraphSx} />

      <Box sx={bottomGraphLegendSx}>
        {bottomLabelTitle && (
          <Typography sx={graphLabelSx} variant="h4">
            {bottomLabelTitle}
          </Typography>
        )}

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
