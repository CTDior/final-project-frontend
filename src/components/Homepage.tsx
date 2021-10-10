import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { Group } from "../models/IceBreaker";
import { addGroup } from "../services/FinalProjectApiServices";

import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="Homepage">
      <div>
        <p>Welcome {user?.displayName}</p>
        <Button variant="outlined" onClick={signInWithGoogle}>
          Sign In With Google
        </Button>
        <Button variant="outlined" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div>
        <Button href="/group/create" variant="outlined">
          Create A Group
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
