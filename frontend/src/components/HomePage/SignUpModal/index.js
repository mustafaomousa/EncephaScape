import { Button, Stack, TextField, Modal } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import brain from "../../Navigation/brain.png";

const SignUpModal = ({ switchToLogin, open, handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      await dispatch(
        login({ username: values.username, password: values.password })
      ).catch((response) => {
        for (let i = 0; i < response.data.errors.length; i++) {
          let error = response.data.errors[i];
          formik.setFieldError(error.param, error.msg);
        }
      });
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "70px 50px",
          borderRadius: "0.2em",
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          <img src={brain} alt="EncephaScape" style={{ height: 150 }} />
          <TextField
            size="small"
            variant="filled"
            fullWidth
            label="Username"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            size="small"
            variant="filled"
            fullWidth
            label="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            size="small"
            variant="filled"
            fullWidth
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            size="small"
            variant="filled"
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Stack
            direction="column"
            justifyContent="flex-end"
            width="100%"
            spacing={1}
          >
            <Button
              variant="outlined"
              fullWidth
              disableElevation
              type="submit"
              size="large"
              onClick={switchToLogin}
            >
              Switch to login
            </Button>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
              size="large"
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default SignUpModal;
