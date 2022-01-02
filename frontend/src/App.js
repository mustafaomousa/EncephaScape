import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import BrainfolioPage from "./components/BrainfolioPage";
import BrowseByCategoryPage from "./components/BrowseByCategoryPage";
import StudyStackPage from "./components/StudyStackPage";
import EditStack from "./components/EditStack";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginFormPage} />
            <Route path="/signup" component={SignupFormPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/brainfolio" component={BrainfolioPage} />
            <Footer />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
