import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

type Properties = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  inspectorName: string;
}

const DeleteModal: React.FC<Properties> = ({ open, onClose, onConfirm, inspectorName }) => {
  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Inspector</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{inspectorName}</strong>?<br />
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteModal;
