import { Button, Modal, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import brain from "../../Navigation/brain.png";

const LoginModal = ({ switchToSignUp, open, handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(
        login({ credential: values.credential, password: values.password })
      )
        .then(() => handleClose())
        .catch((response) => {
          for (let i = 0; i < response.data.errors.length; i++) {
            let error = response.data.errors[i];
            if (error.param === "auth") {
              console.log(error);
              formik.setFieldError("credential", error.msg);
              formik.setFieldError("password", error.msg);
            } else {
              formik.setFieldError(error.param, error.msg);
            }
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
            label="Username or Email"
            id="credential"
            name="credential"
            value={formik.values.credential}
            onChange={formik.handleChange}
            error={
              formik.touched.credential && Boolean(formik.errors.credential)
            }
            helperText={formik.touched.credential && formik.errors.credential}
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
              size="large"
              onClick={() => {
                formik.setFieldValue("credential", "Demo-lition");
                formik.setFieldValue("password", "password");
                return formik.handleSubmit();
              }}
            >
              Demo
            </Button>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
              size="large"
            >
              Log in
            </Button>
            <Button
              fullWidth
              disableElevation
              size="large"
              onClick={switchToSignUp}
            >
              Switch to sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default LoginModal;
