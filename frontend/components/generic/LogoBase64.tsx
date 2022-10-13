import { Avatar, SxProps, Theme } from '@mui/material';

interface Props {
  // Base64 encoding of an image (prefix should not be included).
  base64Src: string;

  // From Avatar props:
  alt?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
    sx?: SxProps<Theme>;
  };
  sx?: SxProps<Theme>;
  variant?: 'circular' | 'rounded' | 'square';
  sizes?: string;
}

export default function LogoBase64({ base64Src, variant, ...props }: Props) {
  return (
    <Avatar
      style={{ objectFit: 'contain', marginLeft: 12 }}
      variant={variant ?? 'square'}
      {...props}
      src={`data:image/png;base64,${base64Src}`}
    />
  );
}
