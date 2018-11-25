import React, { Component } from "react";
import SignUp from "./components/sign-up";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

class App extends Component {

  state = {
    loggedIn: false,
    username: null
  }

  updateUser = (userObject) => {
    this.setState(userObject)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" render={() => <SignUp updateUser={this.updateUser}/>}/>
            <Route exact path="/login" render={() => <Login updateUser={this.updateUser}/>} />
            <Route exact path="posts" component={Posts} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
