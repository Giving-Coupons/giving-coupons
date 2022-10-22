import { Typography } from '@mui/material';
import { Box, Stack, SxProps } from '@mui/system';
import {
  graphLabelSx,
  graphLegendSx,
  leftBarSx,
  rightBarSx,
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
  return (
    <Stack component="div">
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

      <Box sx={graphLegendSx}>
        {leftLabel && <Typography sx={graphLabelSx}>{leftLabel}</Typography>}

        {rightLabel && <Typography sx={graphLabelSx}>{rightLabel}</Typography>}
      </Box>
    </Stack>
  );
};

export default SmallCompetingGraph;
