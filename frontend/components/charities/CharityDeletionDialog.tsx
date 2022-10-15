import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from '../generic/Button';
import { CharityListData } from '../../types/charity';
import { Nullable } from '../../types/utils';

export default function CharityDeletionDialog({
  selectedCharity,
  handleClose,
  handleDelete,
  open,
}: {
  selectedCharity: Nullable<CharityListData>;
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h1">Delete {selectedCharity?.name}</Typography>
      </DialogTitle>

      <DialogContent>Are you sure you want to delete this charity? This cannot be undone.</DialogContent>

      <DialogActions>
        <Button actionType="muted" onClick={handleClose}>
          Cancel
        </Button>
        <Button actionType="danger" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
