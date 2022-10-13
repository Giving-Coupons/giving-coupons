import { Box, SxProps, Theme } from '@mui/material';

interface Props {
  // Base64 encoding of an image (prefix should not be included).
  base64Src: string;

  // From Avatar props:
  alt?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  sx?: SxProps<Theme>;
}

export default function LogoBase64({ base64Src, alt, imgProps, sx }: Props) {
  imgProps = { ...imgProps, alt: imgProps?.alt ?? alt };
  return (
    <Box sx={sx}>
      <img {...imgProps} src={`data:image/png;base64,${base64Src}`}></img>
    </Box>
  );
}
