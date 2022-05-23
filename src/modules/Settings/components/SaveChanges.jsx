import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function SaveChanges() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "success.main",
          color: "white",
          "&:hover": { backgroundColor: "success.main" },
        }}
        onClick={handleClickOpen}
      >
        Save Changes
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" color="success.main" mt={3}>
          Save Changes
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="text.primary">
            Are you sure you want to Save changes ?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
            padding:5
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              backgroundColor: "white",
              color: "text.primary",
              "&:hover": { backgroundColor: "white" },
              width: "140px"
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              backgroundColor: "success.main",
              color: "white",
              "&:hover": { backgroundColor: "success.main" },
              width: "140px"
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SaveChanges;
