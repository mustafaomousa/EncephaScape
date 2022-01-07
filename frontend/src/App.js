import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import BrainfolioPage from "./components/BrainfolioPage";
import CreateStackPage from "./components/CreateStackPage";
import Footer from "./components/Footer";
import StackPage from "./components/StackPage";
import SearchStacksPage from "./components/SearchStacksPage";

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
            <Route exact path="/stacks" component={SearchStacksPage} />
            <Route exact path="/stacks/create" component={CreateStackPage} />
            <Route path="/stacks/:stackId" component={StackPage} />
            <Footer />
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
