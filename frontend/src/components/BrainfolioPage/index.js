import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BrainfolioActions from "./BrainfolioActions";
import BrainfolioStacks from "./BrainfolioStacks";
import BrainfolioBookmarkedStacks from "./BrainfolioBookmarkedStacks";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "140px 40px",
  },
  brainfolioSection: {
    paddingBottom: "40px",
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
        <Typography variant="h2" color="secondary" gutterBottom={1}>
          Your stacks
        </Typography>
        <BrainfolioStacks />
      </Box>
      <Box className={classes.brainfolioSection}>
        <Typography variant="h2" color="secondary" gutterBottom={1}>
          Bookmarked stacks
        </Typography>
        <BrainfolioBookmarkedStacks />
      </Box>
    </Box>
  );
};

export default BrainfolioPage;
