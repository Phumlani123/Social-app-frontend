import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// PAges
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={home} />
              <AuthRoute path="/login" exact component={login} authenticated={authenticated}/>
              <AuthRoute path="/signup" exact component={signup} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
