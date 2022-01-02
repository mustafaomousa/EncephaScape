import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllCategories } from "../../store/category";
import NewestStacks from "./NewestStacks";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Stack className={classes.root} alignItems="center">
      <Stack
        alignItems="center"
        sx={{
          padding: "100px 50px",
          maxWidth: 1200,
        }}
      >
        <Stack width="100%" spacing={1} alignItems="flex-end">
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
      </Stack>
      <Stack
        alignItems="center"
        sx={{
          padding: "100px 50px",
          maxWidth: 1200,
        }}
      >
        <NewestStacks />
      </Stack>
    </Stack>
  );
};

export default HomePage;
