/** @format */

import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { Group } from "../../models/IceBreaker";
import { addGroup } from "../../services/FinalProjectApiServices";

import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="Homepage">
      <div className="createGroup">
        <Button href="/group/create" variant="outlined">
          Create A Group
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
