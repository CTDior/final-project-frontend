/** @format */

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Group } from "../../models/IceBreaker";
import { addGroup } from "../../services/FinalProjectApiServices";
import "./CreateAGroup.css";

function CreateAGroup() {
  const [name, setName] = useState("");
  const [question1, setQuestion1] = useState("");

  function handleAddGroup(group: Group) {
    addGroup(group).then((newGroup) => {
      goToGroupPage(newGroup._id!);
    });
  }

  const history = useHistory();
  function goToGroupPage(groupID: string) {
    history.push(`/group/${encodeURIComponent(groupID)}`);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //gather data from state
    const group: Group = {
      name: name,
    };
    handleAddGroup(group);
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
