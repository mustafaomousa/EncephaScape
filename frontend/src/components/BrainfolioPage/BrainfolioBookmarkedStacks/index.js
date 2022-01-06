import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserBookmarks } from "../../../store/bookmarks";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "0.3em",
  },
}));

const BrainfolioBookmarkedStacks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => dispatch(getUserBookmarks()), []);
  return <Box className={classes.root}></Box>;
};

export default BrainfolioBookmarkedStacks;
