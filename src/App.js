import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// PAges
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/login" exact component={login} />
            <Route path="/signup" exact component={signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
