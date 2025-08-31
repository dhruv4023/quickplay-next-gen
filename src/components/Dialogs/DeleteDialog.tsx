import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import React from 'react';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string | number) => void;
  displayData: string;
  id: string | number;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, displayData, id }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion !</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {displayData}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm(id);
            onClose();
          }}
          sx={{ bgcolor: "red" }}
          color="primary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
