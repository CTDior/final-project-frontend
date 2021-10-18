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
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { Group, GroupMember } from "../../models/IceBreaker";
import {
  addGroup,
  fetchAllGroups,
  fetchAllGroupsByUser,
} from "../../services/FinalProjectApiServices";

import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);
  const [member, setMember] = useState<GroupMember[]>([]);

  useEffect(() => {
    loadGroups();
  }, []);

  function loadGroups() {
    fetchAllGroupsByUser(user?.uid!).then((memberFromApi) => {
      setMember(memberFromApi);
    });
  }

  const history = useHistory();
  function handleChange(groupID: string) {
    history.push(`/group/${encodeURIComponent(groupID)}`);
  }

  return (
    <div className="Homepage">
      <h3>Break the Ice By Warming Up to Others!</h3>

      <div className="createGroup">
        <Link to="/group/create">
          <Button
            className="createGroupButton"
            sx={{ m: 2 }}
            variant="outlined"
          >
            Create A Group
          </Button>
        </Link>
      </div>
      <div className="selectGroupButton">
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel sx={{ color: "primary.main" }} id="groupName">
            Select a Group
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select a Group"
            color="primary"
            onChange={(e) => handleChange(e.target.value as string)}
            sx={{ color: "primary.main" }}
          >
            {member.map((group) => (
              <MenuItem key={group.groupId} value={group.groupId}>
                {group.groupName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Homepage;
