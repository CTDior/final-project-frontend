import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Group, Question } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import "./Admin.css";

function Admin() {
  // This is to copy the URL (on the group page) to share with groupmembers.
  const [copied, setCopied] = useState(false);
  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  // This is to select a live question from the question list
  const [liveQuestion, setLiveQuestion] = useState("");

  // Function to add live question ID to group
  // We need a new service and endpoint
  // function handleAddGroup(group: Group) {
  //   addGroup(group).then((newGroup) => {
  //     goToGroupPage(newGroup._id!);
  //   });
  // }

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   //gather data from state
  //   const group: Group = {
  //     name: name,
  //     adminUid: user?.uid!,
  //     liveQuestionId: liveQuestionId;
  //   };
  //   handleAddGroup(group);
  //   setName("");
  // }

  return (
    <div className="Admin">
      <div>
        <Button variant="outlined" onClick={copy}>
          {!copied ? "Copy link to share with group" : "Copied!"}
        </Button>
      </div>
      <div className="CreateAGroup">
        <h2>Create a Group for Your Team</h2>
        <FormControl>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            required
            labelId="questions"
            id="Live Question"
            value={liveQuestion}
            label="Live Question"
            onChange={(e) => setLiveQuestion(e.target.value)}
          >
            {questions.map((question) => (
              <MenuItem key={question._id} value={question._id}>
                {question.text}
              </MenuItem>
            ))}
          </Select>

          {/* <Button onClick={handleSubmit}>Create Group</Button> */}
        </FormControl>
      </div>
    </div>
  );
}

export default Admin;
