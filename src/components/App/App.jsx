import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import Wallet from '../Wallet/Wallet';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Dashboard from '../Dashboard/DashboardPage';
import CreateWallet from '../Dashboard/Operations/CreateWallet';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/createwallet" exact>
            <CreateWallet />
          </Route>

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route path="/about" exact>
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
          Visiting localhost:3000/user will show the UserPage if the user is logged in.
          If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute exact path="/user">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/wallet">
            <Wallet />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              <Redirect to="/user" />
            ) : (
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              <Redirect to="/user" />
            ) : (
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              <Redirect to="/user" />
            ) : (
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
