/** @format */

import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAGroup from "./components/CreateAGroup/CreateAGroup";
import GroupPage from "./components/GroupPage/GroupPage";
import Header from "./components/Header/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "./firebaseConfig";
import { Button } from "@mui/material";

function App() {
  const { user } = useContext(AuthContext);
  const authProvider = new GoogleAuthProvider();
  const signInWithGoogle = (): void => {
    signInWithPopup(auth, authProvider);
  };
  // const signOut = (): void => {
  //   auth.signOut();
  // };

  return (
    <div className="App">
      <Router>
        <Header />
        <h2>Break the Ice By Warming Up to Others!</h2>
        {user ? (
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/group/create" exact>
              <CreateAGroup />
            </Route>
            <Route path="/group/:id">
              <GroupPage />
            </Route>
          </Switch>
        ) : (
          <div className="button">
            {/* <button>Please Login To Continue</button> */}
            <Button
              sx={{ margin: 2 }}
              onClick={signInWithGoogle}
              variant="contained"
              className="login"
            >
              Log In To Continue
            </Button>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
