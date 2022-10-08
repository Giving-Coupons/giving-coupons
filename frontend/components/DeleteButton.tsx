import React from 'react';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteButtonProps = {
  onDelete: () => void;
};

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  return <IconButtonWithTooltip icon={<DeleteIcon />} tooltip="Delete" onClick={onDelete} />;
}
