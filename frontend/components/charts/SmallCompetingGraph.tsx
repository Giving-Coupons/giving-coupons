import { Typography } from '@mui/material';
import { Box, Stack, SxProps } from '@mui/system';
import {
  graphLabelSx,
  graphLegendSx,
  leftBarSx,
  rightBarSx,
  emptyBarSx,
} from '../../styles/components/charts/SmallCompetingGraphStyles';
import { Nullable } from '../../types/utils';
import HorizontalBarGraph from './HorizontalBarGraph';

interface Props {
  leftLabel?: string;
  rightLabel?: string;
  barFractions: [Nullable<number>, Nullable<number>];
  overrideGraphSx?: SxProps;
}

const SmallCompetingGraph = ({ leftLabel, rightLabel, barFractions, overrideGraphSx = [] }: Props) => {
  const fakeOffsetFraction = 1 / 25;

  return (
    <Stack component="div">
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

      <Box sx={graphLegendSx}>
        {leftLabel && <Typography sx={graphLabelSx}>{leftLabel}</Typography>}

        {rightLabel && <Typography sx={graphLabelSx}>{rightLabel}</Typography>}
      </Box>
    </Stack>
  );
};

export default SmallCompetingGraph;
