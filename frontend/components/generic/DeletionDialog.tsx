import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from './Button';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  titleName: string;
  name: string;
}

const DeletionDialog = ({ open, handleClose, handleDelete, titleName, name }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography>Delete {titleName}</Typography>
      </DialogTitle>

      <DialogContent>Are you sure you want to delete this {name}? This cannot be undone.</DialogContent>

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
};

export default DeletionDialog;
