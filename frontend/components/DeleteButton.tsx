import React from 'react';
import IconButtonWithTooltip, { IconButtonWithTooltipProps } from './IconButtonWithTooltip';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteButtonProps = Omit<IconButtonWithTooltipProps, 'icon' | 'tooltip'>;

export default function DeleteButton(props: DeleteButtonProps) {
  return <IconButtonWithTooltip icon={<DeleteIcon />} tooltip="Delete" {...props} />;
}
