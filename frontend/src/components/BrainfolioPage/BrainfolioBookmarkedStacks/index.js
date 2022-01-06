import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Stack from "../../Stack";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "0.3em",
  },
}));

const BrainfolioBookmarkedStacks = ({ bookmarks }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={4}>
        {bookmarks &&
          Object.keys(bookmarks).map((stackId) => {
            let stack = bookmarks[stackId].Stack;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Stack stack={stack} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default BrainfolioBookmarkedStacks;
