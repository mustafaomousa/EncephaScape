import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllCategories } from "../../store/category";
import NewestStacks from "./NewestStacks";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "140px 40px",
  },
  homeSection: {
    paddingBottom: "40px",
    maxWidth: 1200,
    width: "100%",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Box className={classes.homeSection}>
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
      </Box>
      <Box className={classes.homeSection}>
        <NewestStacks />
      </Box>
    </Box>
  );
};

export default HomePage;
