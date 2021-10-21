/** @format */

import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAGroup from "./components/CreateAGroup/CreateAGroup";
import GroupPage from "./components/GroupPage/GroupPage";
import Header from "./components/Header/Header";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "./firebaseConfig";
import { Button, createTheme, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Switch as MuiSwitch } from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(AuthContext);
  const authProvider = new GoogleAuthProvider();
  const signInWithGoogle = (): void => {
    signInWithPopup(auth, authProvider);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDarkMode(event.target.checked);
  // };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          <Router>
            <Header />
            <MuiSwitch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />{" "}
            Color Mode
            {/* <h3>Break the Ice By Warming Up to Others!</h3> */}
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
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
