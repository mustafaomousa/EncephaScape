import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NewestStacks from "./NewestStacks";
import { getUserBookmarks } from "../../store/bookmarks";
import BrainfolioBookmarkedStacks from "../BrainfolioPage/BrainfolioBookmarkedStacks";
import Categories from "./Categories";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "140px 40px",
  },
  homeSection: {
    paddingBottom: "40px",
    maxWidth: 1200,
    width: "100%",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const bookmarks = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getUserBookmarks());
  }, [dispatch, sessionUser]);

  return (
    <Box className={classes.root}>
      <Box className={classes.homeSection}>
        <Stack width="100%" spacing={1} alignItems="flex-end">
          <Typography
            variant="h2"
            align="end"
            color="#fff"
            letterSpacing={2}
            fontWeight="bold"
          >
            We believe in the wonders our brain can perform through studying
          </Typography>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Link href="/stacks" underline="none">
                <Button
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  size="medium"
                >
                  Search stacks
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/brainfolio/create" underline="none">
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  size="medium"
                >
                  Create a stack
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {sessionUser && (
        <Box className={classes.homeSection}>
          <Typography
            variant="h3"
            color="secondary"
            gutterBottom={1}
            fontWeight="bold"
          >
            Your bookmarked stacks
          </Typography>
          <BrainfolioBookmarkedStacks bookmarks={bookmarks} />
        </Box>
      )}
      <Box className={classes.homeSection}>
        <Typography
          variant="h3"
          color="secondary"
          gutterBottom={1}
          fontWeight="bold"
        >
          Some of our categories
        </Typography>
        <Categories />
      </Box>
      <Box className={classes.homeSection}></Box>
    </Box>
  );
};

export default HomePage;
