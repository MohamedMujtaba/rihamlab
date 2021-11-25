import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNav from "./components/SideNav/SideNav";
import Bills from "./pages/Bills/Bills";
import NewBill from "./pages/NewBill/NewBill";
import NewResult from "./pages/NewResult/NewResult";
import NewTest from "./pages/NewTest/NewTest";
import NewUser from "./pages/NewUser/NewUser";
import Results from "./pages/Results/Results";
import TestDit from "./pages/TestDit/TestDit";
import TestRes from "./pages/TestRes/TestRes";
import UpdateRes from "./pages/UpdateRes/UpdateRes";
import Tests from "./pages/Tests/Tests";
import Userdit from "./pages/Userdit/Userdit";
import Users from "./pages/Users/Users";
import BillDit from "./pages/BillDit/BillDit";

function App() {
  return (
    <Router>
      <SideNav />
      <Switch>
        <div className="cont">
          <Route exact path="/">
            <Users />
          </Route>
          <Route path="/userdit/:id">
            <Userdit />
          </Route>
          <Route path="/newuser">
            <NewUser />
          </Route>
          <Route path="/tests">
            <Tests />
          </Route>
          <Route path="/newtest">
            <NewTest />
          </Route>
          <Route path="/test/:id">
            <TestDit />
          </Route>
          <Route path="/testres/:id">
            <TestRes />
          </Route>
          <Route path="/updateres/:id">
            <UpdateRes />
          </Route>
          <Route path="/bills">
            <Bills />
          </Route>
          <Route path="/newbill/:userid">
            <NewBill />
          </Route>
          <Route path="/billdit/:id">
            <BillDit />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/newres/:id">
            <NewResult />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
