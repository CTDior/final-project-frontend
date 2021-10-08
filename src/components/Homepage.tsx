import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Homepage.css";

function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="Homepage">
      <div>
        <p>Welcome {user?.displayName}</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div>
        <button>Create A Group</button>
      </div>
    </div>
  );
}

export default Homepage;
