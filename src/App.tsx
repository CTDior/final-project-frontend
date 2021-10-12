/** @format */

import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAGroup from "./components/CreateAGroup/CreateAGroup";
import { addGroup } from "./services/FinalProjectApiServices";
import { Group } from "./models/IceBreaker";
import GroupPage from "./components/GroupPage/GroupPage";
import Header from "./components/Header/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Header />
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
          <div className="login">
            <p>Please Login To Continue</p>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
