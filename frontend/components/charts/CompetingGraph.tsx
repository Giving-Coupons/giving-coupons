import { Typography } from '@mui/material';
import { Box, Stack, SxProps } from '@mui/system';
import {
  bottomGraphLegendSx,
  emptyBarSx,
  graphLabelSx,
  leftBarSx,
  rightBarSx,
  topGraphLegendSx,
} from '../../styles/components/charts/CompetingGraphStyles';
import { Nullable } from '../../types/utils';
import HorizontalBarGraph from './HorizontalBarGraph';

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
  const fakeOffsetFraction = 1 / 25;

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

      {barFractions[0] === null && barFractions[1] === null && (
        <HorizontalBarGraph bars={[{ fraction: 1 }]} overrideGraphSx={overrideGraphSx} />
      )}

      {barFractions[0] === 0 && barFractions[1] !== null && (
        <HorizontalBarGraph
          bars={[{ fraction: fakeOffsetFraction }, { fraction: barFractions[1] - fakeOffsetFraction }]}
          overrideFirstBarSx={emptyBarSx}
          overrideLastBarSx={rightBarSx}
          overrideGraphSx={overrideGraphSx}
        />
      )}

      {barFractions[1] === 0 && barFractions[0] !== null && (
        <HorizontalBarGraph
          bars={[{ fraction: barFractions[0] - fakeOffsetFraction }, { fraction: fakeOffsetFraction }]}
          overrideFirstBarSx={leftBarSx}
          overrideLastBarSx={emptyBarSx}
          overrideGraphSx={overrideGraphSx}
        />
      )}

      {barFractions[0] !== 0 && barFractions[0] !== null && barFractions[1] !== 0 && barFractions[1] !== null && (
        <HorizontalBarGraph
          bars={[{ fraction: barFractions[0] }, { fraction: barFractions[1] }]}
          overrideFirstBarSx={leftBarSx}
          overrideLastBarSx={rightBarSx}
          overrideGraphSx={overrideGraphSx}
        />
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
