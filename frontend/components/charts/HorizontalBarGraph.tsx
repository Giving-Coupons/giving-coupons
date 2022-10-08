import { Box, SxProps } from '@mui/system';
import { graphSx, lastBarSx, nonLastBarSx } from '../../styles/components/charts/HorizontalBarGraphStyles';
import { combineSxProps } from '../../utils/types';

interface Props {
  barFractions: number[];
  overrideGraphSx?: SxProps;
}

const HorizontalBarGraph = ({ barFractions, overrideGraphSx = [] }: Props) => {
  const barCount = barFractions.length;

  return (
    <Box sx={combineSxProps(overrideGraphSx, graphSx)}>
      {barFractions.map((fraction, index) => (
        <Box key={index} width={`calc(100% * ${fraction})`} sx={index === barCount - 1 ? lastBarSx : nonLastBarSx} />
      ))}
    </Box>
  );
};

export default HorizontalBarGraph;
