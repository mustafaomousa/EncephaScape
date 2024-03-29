import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import QuizIcon from "@mui/icons-material/Quiz";
import usePlayRandomStack from "../../../hooks/usePlayRandomStack";

const useStyles = makeStyles((theme) => ({
  brainfolioActionButton: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 120,
  },
}));

const BrainfolioActions = () => {
  const classes = useStyles();
  const history = useHistory();
  const randomStackId = usePlayRandomStack();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.brainfolioActionButton}
          onClick={() => history.push("/stacks/create")}
        >
          <AddBoxIcon fontSize="large" />
          New Stack
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          variant="contained"
          className={classes.brainfolioActionButton}
          color="secondary"
          onClick={() => history.push(`/stacks/${randomStackId}`)}
        >
          <QuizIcon fontSize="large" />
          Random stack
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          disabled
          color="secondary"
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          disabled
          color="secondary"
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          disabled
          color="secondary"
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          disabled
          color="secondary"
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
    </Grid>
  );
};
export default BrainfolioActions;
