/** @format */

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext";
import { Group } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import { addGroup } from "../../services/FinalProjectApiServices";
import "./CreateAGroup.css";

function CreateAGroup() {
  const [name, setName] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const { user } = useContext(AuthContext);
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
      adminUid: user?.uid!,
      profileQuestions: [question1, question2, question3, question4, question5],
    };
    handleAddGroup(group);
    setName("");
  }

  return (
    <div className="CreateAGroup">
      <h2>Create a Group for Your Team</h2>
      <FormControl>
        <TextField
          required
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
          required
          labelId="questions"
          id="question1"
          value={question1}
          label="Question 1"
          onChange={(e) => setQuestion1(e.target.value)}
        >
          {questions.map((question) => (
            <MenuItem key={question._id} value={question._id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
        <Select
          required
          labelId="questions"
          id="question2"
          value={question2}
          label="Question 2"
          onChange={(e) => setQuestion2(e.target.value)}
        >
          {questions.map((question) => (
            <MenuItem key={question._id} value={question._id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
        <Select
          required
          labelId="questions"
          id="question3"
          value={question3}
          label="Question 3"
          onChange={(e) => setQuestion3(e.target.value)}
        >
          {questions.map((question) => (
            <MenuItem key={question._id} value={question._id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
        <Select
          required
          labelId="questions"
          id="question4"
          value={question4}
          label="Question 4"
          onChange={(e) => setQuestion4(e.target.value)}
        >
          {questions.map((question) => (
            <MenuItem key={question._id} value={question._id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
        <Select
          required
          labelId="questions"
          id="question5"
          value={question5}
          label="Question 5"
          onChange={(e) => setQuestion5(e.target.value)}
        >
          {questions.map((question) => (
            <MenuItem key={question._id} value={question._id}>
              {question.text}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleSubmit}>Create Group</Button>
      </FormControl>
    </div>
  );
}

export default CreateAGroup;
