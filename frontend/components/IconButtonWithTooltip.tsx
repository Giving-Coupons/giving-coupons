import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

export interface IconButtonWithTooltipProps extends IconButtonProps {
  icon: JSX.Element;
  tooltip: string;
}

export default function IconButtonWithTooltip({
  icon,
  tooltip,
  color = 'primary',
  ...rest
}: IconButtonWithTooltipProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color={color} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
