import React, { Component } from "react";
import SignUp from "./components/sign-up";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import axios from "axios"


class App extends Component {
  state = {
    loggedIn: false,
    username: null,
    id: null
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  updateUser = userObject => {
    this.setState(userObject);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} {...this.state} />
            <Route
              exact
              path="/sign-up"
              render={() => (
                <SignUp updateUser={this.updateUser} {...this.state} />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login updateUser={this.updateUser} {...this.state} />
              )}
            />
            <Route
              exact
              path="/posts"
              render={() => <Posts {...this.state} />}
            />
            <Route component={NoMatch} {...this.state} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
