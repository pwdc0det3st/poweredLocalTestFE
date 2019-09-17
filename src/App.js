import React, { Component } from 'react';
import logo from './logo.svg';
import SignIn from './module/partnerSignin/view';
import { Route , Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Main>
      </Main>
    );
  }
}

class Main extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn}></Route>
      </Switch>
    );
  }
}

export default App;
