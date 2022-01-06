import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStacks } from "../../../store/stacks";
import Stack from "../../Stack";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "0.3em",
  },
}));

const BrainfolioStacks = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);
  const stacks = useSelector((state) => state.stacks);

  useEffect(
    () => dispatch(getUserStacks(sessionUser.id)),
    [dispatch, sessionUser]
  );

  return (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={4}>
        {stacks &&
          stacks.map((stack) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Stack stack={stack} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BrainfolioStacks;
