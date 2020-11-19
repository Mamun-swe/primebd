import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/Index'
// import PrivateRoute from './components/PrivateRoute/Index'

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';

import UserMaster from './pages/user/Master';
import AdminMaster from './pages/admin/Master';


function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={Reset} />

            {/* <PrivateRoute> */}
              <Route path="/home" component={UserMaster} />
              <Route path="/admin" component={AdminMaster} />
            {/* </PrivateRoute> */}

          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
