import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import brain from "./brain.png";
import LoginModal from "../HomePage/LoginModal";
import SignUpModal from "../HomePage/SignUpModal";

const useStyles = makeStyles(() => ({
  root: {
    height: 100,
    backgroundColor: "#333333",
    padding: "10px 25px",
  },
  logoImage: {
    height: 70,
  },
  navlink: {
    "&:hover": {
      borderBottom: "1px solid #ffffff",
    },
  },
}));

function Navigation() {
  const classes = useStyles();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);
  const handleSignUpModalOpen = () => setSignUpModalOpen(true);
  const handleSignUpModalClose = () => setSignUpModalOpen(false);

  const switchToSignUp = () => {
    handleLoginModalClose();
    handleSignUpModalOpen();
  };

  const switchToLogin = () => {
    handleSignUpModalClose();
    handleLoginModalOpen();
  };
  console.log(location.pathname);
  return (
    <AppBar elevation={0}>
      <LoginModal
        open={loginModalOpen}
        handleClose={handleLoginModalClose}
        switchToSignUp={switchToSignUp}
      />
      <SignUpModal
        open={signUpModalOpen}
        handleClose={handleSignUpModalClose}
        switchToLogin={switchToLogin}
      />
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Stack alignItems="flex-start" justifyContent="center" height="100%">
            <Link href="/">
              <img
                src={brain}
                className={classes.logoImage}
                alt="EncephaScape"
              />
            </Link>
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
              <Typography
                className={classes.navlink}
                variant="button"
                color="white"
                borderBottom={location.pathname === "/" && "1px solid #ffffff"}
              >
                Home
              </Typography>
            </Link>
            <Link href="/stacks" underline="none">
              <Typography
                className={classes.navlink}
                variant="button"
                color="white"
                borderBottom={
                  location.pathname === "/stacks" && "1px solid #ffffff"
                }
              >
                Stacks
              </Typography>
            </Link>
            {!sessionUser ? (
              <>
                <Divider orientation="vertical" sx={{ height: "2em" }} />
                <Button onClick={handleLoginModalOpen} variant="contained">
                  Log in
                </Button>
                <Button onClick={handleSignUpModalOpen} variant="contained">
                  Getting Started
                </Button>
              </>
            ) : (
              <>
                <Link href="/brainfolio" underline="none">
                  <Typography
                    className={classes.navlink}
                    variant="button"
                    color="white"
                    borderBottom={
                      location.pathname === "/brainfolio" && "1px solid #ffffff"
                    }
                  >
                    Brainfolio
                  </Typography>
                </Link>
                <Divider orientation="vertical" sx={{ height: "2em" }} />
                <Link href="/profile" underline="none">
                  <Button color="secondary" fullWidth variant="contained">
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
