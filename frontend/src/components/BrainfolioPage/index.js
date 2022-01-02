import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStack } from "../../store/stacks";
import { AppContext } from "../../context/AppContextProvider";
import { getAllCategories } from "../../store/category";
import { Route, Switch, useHistory } from "react-router-dom";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CreateStackPage from "./CreateStackPage";
import BrainfolioActions from "./BrainfolioActions";
import BrainfolioStacks from "./BrainfolioStacks";

const useStyles = makeStyles(() => ({
  root: {
    padding: "150px 100px",
  },
}));

const BrainfolioPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser === undefined) {
      alert("Please login or sign-up");
      return history.push("/signup");
    }

    dispatch(getAllCategories());
  }, [dispatch, history, sessionUser]);

  return (
    <Container className={classes.root}>
      <BrainfolioActions />
      <Box>
        <Switch>
          <Route path="/brainfolio/create">
            <Divider style={{ margin: "40px 0" }} />
            <CreateStackPage />
          </Route>
        </Switch>
      </Box>
      <Divider style={{ margin: "40px 0" }} />
      <BrainfolioStacks />
    </Container>
  );
};

export default BrainfolioPage;
