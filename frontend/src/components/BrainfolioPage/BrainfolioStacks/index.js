import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStacks } from "../../../store/stacks";
import Stack from "../../Stack";

const BrainfolioStacks = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const stacks = useSelector((state) => state.stacks);

  useEffect(
    () => dispatch(getUserStacks(sessionUser.id)),
    [dispatch, sessionUser]
  );

  return (
    <Grid container direction="row" spacing={2}>
      {stacks &&
        stacks.map((stack) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack stack={stack} />
          </Grid>
        ))}
    </Grid>
  );
};

export default BrainfolioStacks;
