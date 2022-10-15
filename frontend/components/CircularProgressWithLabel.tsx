import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
  label: React.ReactNode;
};

export default function CircularProgressWithLabel({
  value,
  label,
  ...circularProgressProps
}: CircularProgressWithLabelProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress {...circularProgressProps} value={value} />
      <Box position="absolute">{label}</Box>
    </Box>
  );
}
