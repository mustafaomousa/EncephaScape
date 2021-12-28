import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllCategories } from "../../store/category";
import { getStacks, getTopStacks } from "../../store/stack";
import Login from "./Login";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundColor: "#333333",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const newStacks = useSelector((state) => state.stack.newestStacks);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getStacks());
    dispatch(getTopStacks());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Grid container height="100%">
        <Grid item sm={12} md={6} padding={5}>
          <Stack
            height="100%"
            width="100%"
            alignItems="flex-end"
            justifyContent="center"
            spacing={1}
          >
            <Typography variant="h3" textAlign="center" color="white">
              We believe in the wonders our brain can perform through studying
            </Typography>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item>
                <Button
                  disableElevation
                  fullWidth
                  variant="contained"
                  size="large"
                >
                  Search stacks
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  fullWidth
                  variant="contained"
                  size="large"
                >
                  Create a stack
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          padding={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Login />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
