import { Box } from '@mui/material';

type Props = {
  children: string;
  spaceBefore?: boolean;
  spaceAfter?: boolean;
};

export default function BoldText({ children, spaceBefore = false, spaceAfter = false }: Props) {
  return (
    <Box component="span" sx={{ fontWeight: 'bold' }}>
      {spaceBefore && ' '}
      {children}
      {spaceAfter && ' '}
    </Box>
  );
}
