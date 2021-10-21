/** @format */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Group } from "../../models/IceBreaker";
import questions from "../../questions/questions";
import { updateGroup } from "../../services/FinalProjectApiServices";
import "./Admin.css";

interface Props {
  group: Group;
  onUpdate: () => void;
}

function Admin({ group, onUpdate }: Props) {
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
  const [liveQuestionId, setLiveQuestionId] = useState<string>("");

  // Function to add live question ID to group
  // We need a new service and endpoint
  function handleAddLiveQuestion(selectedLiveQuestionId: string | null) {
    const updatedGroup: Group = {
      ...group,
      liveQuestionId: selectedLiveQuestionId || null,
    };
    updateGroup(updatedGroup).then(onUpdate);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //gather data from state
    handleAddLiveQuestion(liveQuestionId);
  }

  return (
    <div className="Admin">
      <div>
        <p>
          Share this link with anyone you would like to invite to the group.
        </p>
        <Button variant="outlined" onClick={copy}>
          {!copied ? "Copy link to share with group" : "Copied!"}
        </Button>
      </div>
      <div className="CreateAGroup">
        <h2>Select a Live Question</h2>
        <FormControl>
          <InputLabel id="Live Question">Live Question</InputLabel>
          <Select
            required
            labelId="questions"
            id="Live Question"
            value={liveQuestionId}
            label="Live Question"
            onChange={(e) => setLiveQuestionId(e.target.value)}
          >
            {questions.map((question) => (
              <MenuItem key={question._id} value={question._id}>
                {question.text}
              </MenuItem>
            ))}
          </Select>

          <Button
            className="setLiveQuestionButton"
            variant="outlined"
            onClick={handleSubmit}
          >
            Set Live Question
          </Button>
        </FormControl>
        <p>
          <Button variant="outlined" onClick={() => handleAddLiveQuestion("")}>
            Cancel Live Question
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Admin;
