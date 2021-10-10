import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAGroup from "./components/CreateAGroup";
import { addGroup } from "./services/FinalProjectApiServices";
import { Group } from "./models/IceBreaker";

function App() {
  function handleAddGroup(group: Group) {
    addGroup(group);
  }
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/group/create" exact>
            <CreateAGroup onSubmit={handleAddGroup} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
