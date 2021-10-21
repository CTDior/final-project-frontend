/** @format */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { GroupMember } from "../../models/IceBreaker";
import { fetchAllGroupsByUser } from "../../services/FinalProjectApiServices";

import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);
  const [member, setMember] = useState<GroupMember[]>([]);

  useEffect(loadGroups, [user]);

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
      <Paper>
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
              defaultValue=""
            >
              {member.map((group) => (
                <MenuItem key={group.groupId} value={group.groupId}>
                  {group.groupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Paper>
    </div>
  );
}

export default Homepage;
