import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";

import React from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Group } from "../models/IceBreaker";
import { addGroup } from "../services/FinalProjectApiServices";

interface Props {
  onSubmit: (group: Group) => void;
}

export default function CreateAGroup({ onSubmit }: Props) {
  //Dialog Controls
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Form Controls
  const { user } = React.useContext(AuthContext);
  const [groupName, setGroupName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // gather data from state
    const group: Group = {
      name: groupName,
    };

    // send data up to parent via callback prop
    onSubmit(group);
    clearForm();
    handleClose();
  }

  function clearForm() {
    // clear form
    setGroupName("");
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create A Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Note to us: Put instructions later
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
