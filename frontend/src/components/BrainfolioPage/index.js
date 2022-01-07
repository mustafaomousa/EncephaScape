import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BrainfolioActions from "./BrainfolioActions";
import BrainfolioStacks from "./BrainfolioStacks";
import BrainfolioBookmarkedStacks from "./BrainfolioBookmarkedStacks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserBookmarks } from "../../store/bookmarks";
import { getUserStacks } from "../../store/stacks";

const useStyles = makeStyles(() => ({
  root: {
    marginInline: "auto",
    padding: "140px 0",
    width: "min(90%, 1200px)",
  },
  brainfolioSection: {
    paddingBottom: "40px",
  },
}));

const BrainfolioPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const bookmarks = useSelector((state) => state.bookmarks);
  const stacks = useSelector((state) => state.stacks);

  useEffect(() => dispatch(getUserBookmarks()), [dispatch, sessionUser]);
  useEffect(() => dispatch(getUserStacks(sessionUser.id)), []);
  return (
    <Box className={classes.root}>
      <Box className={classes.brainfolioSection}>
        <BrainfolioActions />
      </Box>
      <Box className={classes.brainfolioSection}>
        <Typography
          variant="h3"
          color="secondary"
          gutterBottom={1}
          fontWeight="bold"
        >
          Bookmarked stacks
        </Typography>
        <BrainfolioBookmarkedStacks bookmarks={bookmarks} />
      </Box>
      <Box className={classes.brainfolioSection}>
        <Typography
          variant="h3"
          color="secondary"
          gutterBottom={1}
          fontWeight="bold"
        >
          Your stacks
        </Typography>
        <BrainfolioStacks stacks={stacks} />
      </Box>
    </Box>
  );
};

export default BrainfolioPage;
