import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { SxProps } from '@mui/material';
import { combineSxProps } from '../../utils/types';

type Props = {
  sxProps?: SxProps;
  variant: 'open' | 'close';
};

export default function Quotes({ sxProps = {}, variant }: Props) {
  const rotationSxProps: SxProps = variant === 'open' ? { transform: 'rotate(180deg)' } : {};
  const mergedSxProps = combineSxProps(rotationSxProps, sxProps);
  return <FormatQuoteIcon sx={mergedSxProps} fontSize="large" />;
}
