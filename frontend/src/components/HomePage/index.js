import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllCategories } from "../../store/category";
import { getStacks, getTopStacks } from "../../store/stack";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getStacks());
    dispatch(getTopStacks());
  }, [dispatch]);

  return (
    <Stack className={classes.root}>
      <Stack
        alignItems="center"
        sx={{ backgroundColor: "#333333", padding: "100px 50px" }}
      >
        <Stack maxWidth={1200} spacing={1} alignItems="flex-end">
          <Typography
            variant="h2"
            align="end"
            color="white"
            lineHeight={1.3}
            letterSpacing={3}
          >
            We believe in the wonders our brain can perform through studying
          </Typography>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Link href="/stacks">
                <Button fullWidth variant="contained" size="medium">
                  Search stacks
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/brainfolio">
                <Button fullWidth variant="contained" size="medium">
                  Create a stack
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;
