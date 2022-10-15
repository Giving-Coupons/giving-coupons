import { Box, Stack, SxProps } from '@mui/system';
import { Typography } from '@mui/material';
import HorizontalBarGraph from './HorizontalBarGraph';
import {
  topGraphLegendSx,
  bottomGraphLegendSx,
  graphLabelSx,
  leftBarSx,
  rightBarSx,
} from '../../styles/components/charts/CompetingGraphStyles';
import { Nullable } from '../../types/utils';

interface Props {
  topLabelTitle?: string;
  topLabels?: string[];
  bottomLabelTitle?: string;
  bottomLabels?: string[];
  barFractions: [Nullable<number>, Nullable<number>];
  overrideGraphSx?: SxProps;
}

const CompetingGraph = ({
  topLabelTitle,
  topLabels = [],
  bottomLabelTitle,
  bottomLabels = [],
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

      {barFractions[0] !== null && barFractions[1] !== null ? (
        <HorizontalBarGraph
          bars={[{ fraction: barFractions[0] }, { fraction: barFractions[1] }]}
          overrideFirstBarSx={leftBarSx}
          overrideLastBarSx={rightBarSx}
          overrideGraphSx={overrideGraphSx}
        />
      ) : (
        <HorizontalBarGraph bars={[{ fraction: 1 }]} overrideGraphSx={overrideGraphSx} />
      )}

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
