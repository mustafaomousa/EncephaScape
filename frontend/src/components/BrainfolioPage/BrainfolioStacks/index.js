import { Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStacks } from "../../../store/stacks";
import Stack from "../../Stack";

const useStyles = makeStyles(() => ({}));

const BrainfolioStacks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const stacks = useSelector((state) => state.stacks);

  useEffect(() => dispatch(getUserStacks(sessionUser.id)), [dispatch]);

  return (
    <Box>
      <Typography variant="h3" color="secondary" gutterBottom={1} align="start">
        Your stacks
      </Typography>
      <Grid container direction="row" spacing={3.2} justifyContent="start">
        {stacks &&
          stacks.map((stack) => (
            <Grid item>
              <Stack stack={stack} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BrainfolioStacks;
