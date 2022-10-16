import { Typography, TypographyProps } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import {
  firstBarSx,
  graphSx,
  labelSx,
  lastBarSx,
  middleBarSx,
  onlyBarSx,
} from '../../styles/components/charts/HorizontalBarGraphStyles';
import { combineSxProps } from '../../utils/types';

interface Props {
  bars: { fraction: number; label?: string | number }[];
  overrideGraphSx?: SxProps;
  overrideFirstBarSx?: SxProps;
  overrideMiddleBarSx?: SxProps;
  overrideLastBarSx?: SxProps;
  labelProps?: TypographyProps;
}

const HorizontalBarGraph = ({
  bars,
  overrideFirstBarSx = [],
  overrideLastBarSx = [],
  overrideMiddleBarSx = [],
  overrideGraphSx = [],
  labelProps,
}: Props) => {
  const barCount = bars.length;

  return (
    <Box sx={combineSxProps(graphSx, overrideGraphSx)}>
      {bars.map(({ fraction, label }, index) => (
        <Box
          key={index}
          width={`calc(100% * ${fraction})`}
          sx={
            barCount === 1
              ? combineSxProps(onlyBarSx, overrideFirstBarSx)
              : index === 0
              ? combineSxProps(firstBarSx, overrideFirstBarSx)
              : index === barCount - 1
              ? combineSxProps(lastBarSx, overrideLastBarSx)
              : combineSxProps(middleBarSx, overrideMiddleBarSx)
          }
        >
          <Typography sx={labelSx} {...labelProps}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalBarGraph;
