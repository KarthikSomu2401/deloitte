import logo from './logo.svg';
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </HashRouter>
  );
}

export default App;
