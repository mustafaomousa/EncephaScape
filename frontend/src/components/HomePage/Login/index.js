import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import brain from "../../Navigation/brain.png";

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(
        login({ credential: values.credential, password: values.password })
      ).catch((response) => {
        for (let i = 0; i < response.data.errors.length; i++) {
          let error = response.data.errors[i];
          formik.setFieldError(error.param, error.msg);
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} alignItems={"center"}>
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
          error={formik.touched.credential && Boolean(formik.errors.credential)}
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
          <Button variant="outlined" fullWidth disableElevation type="submit">
            Switch to sign up
          </Button>
          <Button variant="contained" fullWidth disableElevation type="submit">
            Log in
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Login;
