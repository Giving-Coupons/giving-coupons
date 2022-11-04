import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { containerSx, titleSx } from '../styles/components/StatsCardStyles';

export interface StatsCardProps {
  title: string;
  children: ReactNode;
}

const StatsCard = ({ title, children }: StatsCardProps) => {
  return (
    <Stack component="div" sx={containerSx}>
      <Typography sx={titleSx}>{title}</Typography>

      {children}
    </Stack>
  );
};

export default StatsCard;
