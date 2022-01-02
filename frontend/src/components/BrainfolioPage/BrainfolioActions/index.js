import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import QuizIcon from "@mui/icons-material/Quiz";

const useStyles = makeStyles((theme) => ({
  brainfolioActionButton: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 120,
    backgroundColor: "#ffffff",
    [theme.breakpoints.only("sm")]: {
      minHeight: 60,
    },
  },
}));

const BrainfolioActions = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={2}>
        <Button
          variant="contained"
          className={classes.brainfolioActionButton}
          onClick={() => history.push("/brainfolio/create")}
        >
          <AddBoxIcon fontSize="large" />
          New Stack
        </Button>
      </Grid>
      <Grid item sm={12} md={2}>
        <Button variant="contained" className={classes.brainfolioActionButton}>
          <QuizIcon fontSize="large" />
          Random stack
        </Button>
      </Grid>
      <Grid item sm={12} md={2}>
        <Button variant="contained" className={classes.brainfolioActionButton}>
          <BookmarkAddIcon fontSize="large" />
          Bookmark stack
        </Button>
      </Grid>
      <Grid item sm={12} md={2}>
        <Button
          disabled
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item sm={12} md={2}>
        <Button
          disabled
          variant="outlined"
          className={classes.brainfolioActionButton}
        >
          <CollectionsBookmarkIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item sm={12} md={2}>
        <Button
          disabled
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