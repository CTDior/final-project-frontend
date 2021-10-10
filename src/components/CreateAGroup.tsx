import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Group } from "../models/IceBreaker";
import "./CreateAGroup.css";

interface Props {
  onSubmit: (group: Group) => void;
}

function CreateAGroup({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [question1, setQuestion1] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //gather data from state
    const group: Group = {
      name: name,
    };
    onSubmit(group);
    setName("");
  }

  return (
    <div className="CreateAGroup">
      <FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="PostForm__title"
          label="Group Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="questions"
          id="question1"
          value={question1}
          label="Age"
          onChange={(e) => setQuestion1(e.target.value)}
        >
          <MenuItem value={"Do you fold your pizza?"}>
            "Do you fold your pizza?"
          </MenuItem>
        </Select>
        <Button onClick={handleSubmit}>Create Group</Button>
      </FormControl>
    </div>
  );
}

export default CreateAGroup;
