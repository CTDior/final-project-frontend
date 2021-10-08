import React, { useContext } from "react";
import "./App.css";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { AuthContext } from "./context/AuthContext";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
