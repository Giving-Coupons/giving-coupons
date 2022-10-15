import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from '../generic/Button';
import { CharityListData } from '../../types/charity';

export default function CharityDeletionDialog({
  selectedCharity,
  open,
  handleClose,
  handleConfirm,
}: {
  selectedCharity: CharityListData;
  open: boolean;
  handleClose: () => void;
  handleConfirm: (selectedCharity: CharityListData) => void;
}) {
  const { name } = selectedCharity;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h1">Delete {name}</Typography>
      </DialogTitle>

      <DialogContent>Are you sure you want to delete this charity? This cannot be undone.</DialogContent>

      <DialogActions>
        <Button actionType="muted" onClick={handleClose}>
          Cancel
        </Button>
        <Button actionType="danger" onClick={() => handleConfirm(selectedCharity)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
