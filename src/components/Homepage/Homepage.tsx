/** @format */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { Group } from "../../models/IceBreaker";
import {
  addGroup,
  fetchAllGroups,
} from "../../services/FinalProjectApiServices";

import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupID, setGroupID] = useState("");

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  function loadGroups() {
    fetchAllGroups().then((groupsFromApi) => {
      setGroups(groupsFromApi);
    });
  }

  const history = useHistory();
  function handleChange() {
    history.push(`/group/${encodeURIComponent(groupID)}`);
  }

  return (
    <div className="Homepage">
      <div className="createGroup">
        <Button href="/group/create" variant="outlined">
          Create A Group
        </Button>
      </div>
      <div>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel id="groupName">Select a Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select a Group"
            value={groupID}
            onChange={(e) => setGroupID(e.target.value)}
            onClick={handleChange}
          >
            {groups.map((group) => (
              <MenuItem key={group._id}>{group.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Homepage;
