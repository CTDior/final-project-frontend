import React, { useContext } from "react";
import "./App.css";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { AuthContext } from "./context/AuthContext";
import Homepage from "./components/Homepage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
