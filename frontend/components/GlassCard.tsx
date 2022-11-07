import { Box, Typography } from '@mui/material';
import { glassSx, titleSx } from '../styles/components/GlassCardStyles';
import { ReactNode } from 'react';

export interface GlassCardProps {
  title: string;
  children: ReactNode;
}

const GlassCard = ({ title, children }: GlassCardProps) => {
  return (
    <Box sx={glassSx}>
      <Typography sx={titleSx}>{title}</Typography>
      {children}
    </Box>
  );
};

export default GlassCard;
