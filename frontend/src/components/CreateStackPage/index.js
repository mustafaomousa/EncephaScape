import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllCategories } from "../../store/category";
import { createUserStack } from "../../store/stacks";

const useStyles = makeStyles(() => ({
  root: {
    width: "min(90%, 1200px)",
    marginInline: "auto",
    paddingTop: "140px",
  },
  createStackSection: {
    paddingBottom: "40px",
  },
}));

const CreateStackPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const categories = useSelector((state) => state.category.categories);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [cards, setCards] = useState({ 1: { term: "", response: "" } });

  const addCard = () => {
    setCards({
      ...cards,
      [`${Object.keys(cards).length + 1}`]: { term: "", response: "" },
    });
  };

  const updateCardTerm = (e, cardNumber) => {
    setCards({
      ...cards,
      [cardNumber]: { ...cards[cardNumber], term: e.target.value },
    });
  };

  const updateCardResponse = (e, cardNumber) => {
    setCards({
      ...cards,
      [cardNumber]: { ...cards[cardNumber], response: e.target.value },
    });
  };

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
          cards,
        })
      )
        .then(() => {
          history.push("/brainfolio");
        })
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

  return (
    <Box className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h3"
          color="secondary"
          fontWeight="bold"
          gutterBottom={1}
        >
          Create a stack
        </Typography>
        <Box className={classes.createStackSection}>
          <Typography
            variant="h5"
            align="start"
            color="#fff"
            gutterBottom={1}
            fontWeight="bold"
          >
            1. Name your stack
          </Typography>
          <TextField
            fullWidth
            inputProps={{
              sx: {
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
            color="secondary"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box className={classes.createStackSection}>
          <Typography
            variant="h5"
            color="#fff"
            gutterBottom={1}
            fontWeight="bold"
          >
            2. Select a category
          </Typography>
          <Grid container spacing={1}>
            {categories &&
              categories.map((category) => (
                <Grid item>
                  <Button
                    value={category.id}
                    sx={{
                      width: 130,
                      height: 130,
                      borderRadius: "50%",
                      borderColor: "#333",
                    }}
                    fullWidth
                    variant={
                      selectedCategory == category.id ? "contained" : "outlined"
                    }
                    color="secondary"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                  >
                    {category.name}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box className={classes.createStackSection}>
          <Typography
            variant="h5"
            color="#fff"
            gutterBottom={1}
            fontWeight="bold"
          >
            3. Create your questions
          </Typography>
          {cards &&
            Object.keys(cards).map((cardNumber) => {
              const card = cards[cardNumber];
              return (
                <Grid
                  container
                  spacing={5}
                  className={classes.createStackSection}
                >
                  <Grid item xs={6}>
                    <TextField
                      value={card.term}
                      onChange={(e) => updateCardTerm(e, cardNumber)}
                      multiline
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      inputProps={{
                        sx: {
                          color: "#fff",
                        },
                      }}
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: "0.2em",
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="secondary"
                              marginRight="5px"
                            >
                              Q:
                            </Typography>
                          </Box>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={card.response}
                      onChange={(e) => updateCardResponse(e, cardNumber)}
                      multiline
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      inputProps={{
                        sx: {
                          color: "#fff",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="secondary"
                              marginRight="5px"
                            >
                              A:
                            </Typography>
                          </Box>
                        ),
                      }}
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: "0.2em",
                      }}
                    />
                  </Grid>
                </Grid>
              );
            })}
        </Box>
        <Box className={classes.createStackSection}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              alignItems="flex-end"
              width="100%"
            >
              <Button variant="outlined" color="secondary" onClick={addCard}>
                Add question
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Create stack
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default CreateStackPage;
