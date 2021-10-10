/** @format */

import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAGroup from "./components/CreateAGroup/CreateAGroup";
import { addGroup } from "./services/FinalProjectApiServices";
import { Group } from "./models/IceBreaker";
import GroupPage from "./components/GroupPage/GroupPage";
import Header from "./components/Header/Header";

function App() {
  function handleAddGroup(group: Group) {
    addGroup(group);
  }
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/group/create" exact>
            <CreateAGroup onSubmit={handleAddGroup} />
          </Route>
          <Route path="/group/:id">
            <GroupPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
