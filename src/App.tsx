import React, { useContext } from "react";
import "./App.css";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <div>
        <p>Welcome {user?.displayName}</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
