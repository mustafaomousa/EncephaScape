import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import BrainfolioPage from "./components/BrainfolioPage";
import Footer from "./components/Footer";
import StackPage from "./components/StackPage";

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
            <Route path="/profile" component={ProfilePage} />
            <Route path="/brainfolio" component={BrainfolioPage} />
            <Route path="/stacks/:stackId" component={StackPage} />
            <Footer />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
