import React from "react";
import { AppBar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import brain from "./brain.png";

const useStyles = makeStyles(() => ({
  root: {
    height: 100,
    backgroundColor: "#333333",
    padding: "10px 25px",
  },
  logoImage: {
    height: 70,
  },
}));

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const classes = useStyles();

  return (
    <AppBar elevation={0}>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Stack alignItems="flex-start" justifyContent="center" height="100%">
            <img
              src={brain}
              className={classes.logoImage}
              alt="EncephaScape"
            ></img>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            height="100%"
            spacing={2}
          >
            <Link exact href="/" underline="none">
              <Typography variant="body1" color="white">
                Home
              </Typography>
            </Link>
            {!sessionUser ? (
              <>
                <Link href="/login" underline="none">
                  <Typography variant="body1" color="white">
                    Log In
                  </Typography>
                </Link>
                <Link href="/signup" underline="none">
                  <Typography variant="body1" color="white">
                    Sign Up
                  </Typography>
                </Link>
              </>
            ) : (
              <>
                <Link href="/stack" underline="none">
                  <Typography variant="body1" color="white">
                    Stacks
                  </Typography>
                </Link>
                <Link href="/brainfolio" underline="none">
                  <Typography variant="body1" color="white">
                    Brainfolio
                  </Typography>
                </Link>
                <Link href="/profile" underline="none">
                  <Button size="small" fullWidth variant="outlined">
                    {sessionUser.username}
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Navigation;
