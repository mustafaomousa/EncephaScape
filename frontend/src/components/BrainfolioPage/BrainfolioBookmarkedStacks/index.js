import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}));

const BrainfolioBookmarkedStacks = () => {
  const classes = useStyles();
  return <Box className={classes.root}></Box>;
};

export default BrainfolioBookmarkedStacks;
