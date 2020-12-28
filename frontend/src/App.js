import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import AppContextProvider from './context/AppContextProvider';
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import Brainfolio from "./components/BrainfolioPage";
import Stack from './components/Stack';
import BrowseByCategoryPage from './components/BrowseByCategoryPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <AppContextProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/brainfolio">
              <Brainfolio />
            </Route>
            <Route path={`/stack/:id`} component={Stack} />
            <Route path={`/category/:id`} component={BrowseByCategoryPage} />
          </Switch>
        )}
      </AppContextProvider>
    </>
  );
}

export default App;
