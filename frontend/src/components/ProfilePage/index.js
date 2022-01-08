import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    marginInline: "auto",
    padding: "140px 0",
    width: "min(90%, 1200px)",
  },
  profileSection: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "40px",
    marginBottom: "40px",
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <Box className={classes.root}>
      <Typography
        variant="h3"
        fontWeight="bold"
        color="secondary"
        gutterBottom={1}
      >
        Profile
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="secondary"
        gutterBottom={1}
      >
        Account information
      </Typography>
      <Box className={classes.profileSection}>
        {sessionUser && (
          <Stack spacing={1}>
            <TextField
              color="secondary"
              size="small"
              variant="filled"
              fullWidth
              label="Username"
              id="username"
              name="username"
              value={sessionUser.username}
              InputProps={{
                sx: { backgroundColor: "rgba(99,99,99,.5)", color: "#fff" },
              }}
              InputLabelProps={{ sx: { color: "#c66b3d" } }}
            />
            <TextField
              color="secondary"
              size="small"
              variant="filled"
              fullWidth
              label="Email"
              id="email"
              name="email"
              value={sessionUser.email}
              InputProps={{
                sx: { backgroundColor: "rgba(99,99,99,.5)", color: "#fff" },
              }}
              InputLabelProps={{ sx: { color: "#c66b3d" } }}
            />
          </Stack>
        )}
        <Stack alignItems="flex-end" padding="10px 0">
          <Button color="secondary" size="small" variant="outlined">
            Update
          </Button>
        </Stack>
      </Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="secondary"
        gutterBottom={1}
      >
        Password
      </Typography>
      <Box className={classes.profileSection}>
        <Stack spacing={1}>
          <TextField
            type="password"
            color="secondary"
            size="small"
            variant="filled"
            fullWidth
            label="Current Password"
            id="password"
            name="password"
            InputProps={{
              sx: { backgroundColor: "rgba(99,99,99,.5)", color: "#fff" },
            }}
            InputLabelProps={{ sx: { color: "#c66b3d" } }}
          />
          <TextField
            type="password"
            color="secondary"
            size="small"
            variant="filled"
            fullWidth
            label="New Password"
            id="password"
            name="password"
            InputProps={{
              sx: { backgroundColor: "rgba(99,99,99,.5)", color: "#fff" },
            }}
            InputLabelProps={{ sx: { color: "#c66b3d" } }}
          />
          <TextField
            type="password"
            color="secondary"
            size="small"
            variant="filled"
            fullWidth
            label="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            InputProps={{
              sx: { backgroundColor: "rgba(99,99,99,.5)", color: "#fff" },
            }}
            InputLabelProps={{ sx: { color: "#c66b3d" } }}
          />
        </Stack>
        <Stack alignItems="flex-end" padding="10px 0">
          <Button color="secondary" size="small" variant="outlined">
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfilePage;
