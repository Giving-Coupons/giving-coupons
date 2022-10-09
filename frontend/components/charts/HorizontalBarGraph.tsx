import { Box, SxProps } from '@mui/system';
import { firstBarSx, graphSx, lastBarSx, middleBarSx } from '../../styles/components/charts/HorizontalBarGraphStyles';
import { combineSxProps } from '../../utils/types';

interface Props {
  barFractions: number[];
  overrideGraphSx?: SxProps;
  overrideFirstBarSx?: SxProps;
  overrideMiddleBarSx?: SxProps;
  overrideLastBarSx?: SxProps;
}

const HorizontalBarGraph = ({
  barFractions,
  overrideFirstBarSx = [],
  overrideLastBarSx = [],
  overrideMiddleBarSx = [],
  overrideGraphSx = [],
}: Props) => {
  const barCount = barFractions.length;

  return (
    <Box sx={combineSxProps(overrideGraphSx, graphSx)}>
      {barFractions.map((fraction, index) => (
        <Box
          key={index}
          width={`calc(100% * ${fraction})`}
          sx={
            index === 0
              ? combineSxProps(firstBarSx, overrideFirstBarSx)
              : index === barCount - 1
              ? combineSxProps(lastBarSx, overrideLastBarSx)
              : combineSxProps(middleBarSx, overrideMiddleBarSx)
          }
        />
      ))}
    </Box>
  );
};

export default HorizontalBarGraph;
