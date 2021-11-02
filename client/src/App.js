import './App.css';
import { Login } from './views/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home2 } from "./views/Home2";
import { Signup } from "./views/Signup";


function App() {
  return (

    //user contexto en el componente necesario
      <Router>
        <Route path="/home"  component={Home2}/>
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        </Switch>
      </Router>

  );
}

export default App;
