import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/Index'
import PrivateRoute from './components/PrivateRoute/Index'

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';

import UserMaster from './pages/user/Master';
import AdminMaster from './pages/admin/Master';

import SocketPage from './pages/socket/Index';


function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/socket" component={SocketPage} />

            <PrivateRoute path="/home" role="user">
              <UserMaster />
            </PrivateRoute>

            <PrivateRoute path="/admin" role="admin">
              <AdminMaster />
            </PrivateRoute>

          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
