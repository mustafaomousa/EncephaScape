import {
  Button,
  Container,
  Grid,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../store/category";
import { createUserStack } from "../../../store/stacks";

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px 25px",
  },
}));

const CreateStackPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector((state) => state.category.categories);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [stackCreated, setStackCreated] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      await dispatch(
        createUserStack({
          name: values.name,
          categoryId: selectedCategory,
          userId: sessionUser.id,
        })
      )
        .then(() => setStackCreated(true))
        .catch((response) => {
          for (let i = 0; i < response.data.errors.length; i++) {
            let error = response.data.errors[i];
            formik.setFieldError(error.param, error.msg);
          }
        });
    },
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <Paper className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} display={stackCreated ? "none" : ""}>
          <Box>
            <Typography
              variant="button"
              align="start"
              sx={{
                fontSize: 18,
              }}
            >
              Name your stack
            </Typography>
            <TextField
              fullWidth
              inputProps={{ sx: { fontSize: "25px" } }}
              variant="filled"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box>
            <Typography
              variant="button"
              sx={{
                fontSize: 18,
              }}
            >
              Select a category
            </Typography>
            <Grid container spacing={1}>
              {categories &&
                categories.map((category) => (
                  <Grid item>
                    <Button
                      value={category.id}
                      sx={{ width: 130, height: 130, borderRadius: "50%" }}
                      fullWidth
                      variant={
                        selectedCategory == category.id
                          ? "contained"
                          : "outlined"
                      }
                      onClick={(e) => setSelectedCategory(e.target.value)}
                    >
                      {category.name}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Stack>
        <Stack alignItems="end" marginTop={2}>
          <Button variant="contained" fullWidth type="submit">
            Continue
          </Button>
        </Stack>
      </form>
      <form>
        <Grid container>
          <Grid item xs={6}>
            <Stack>
              <Typography>Front</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateStackPage;
