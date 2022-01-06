import { Route, Switch } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CreateStackPage from "./CreateStackPage";
import BrainfolioActions from "./BrainfolioActions";
import BrainfolioStacks from "./BrainfolioStacks";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "100px 40px",
  },
  brainfolioSection: {
    paddingTop: "50px",
    maxWidth: 1200,
    width: "100%",
  },
}));

const BrainfolioPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.brainfolioSection}>
        <BrainfolioActions />
      </Box>
      <Box className={classes.brainfolioSection}>
        <Switch>
          <Route exact path="/brainfolio">
            <Typography variant="h2" color="secondary" gutterBottom={1}>
              Your stacks
            </Typography>
            <BrainfolioStacks />
          </Route>
          <Route path="/brainfolio/create">
            <Typography variant="h2" color="secondary" gutterBottom={1}>
              Create a stack
            </Typography>
            <CreateStackPage />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default BrainfolioPage;
