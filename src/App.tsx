import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <p>Welcome {user?.displayName}</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default App;
