import {
  Button,
  Container,
  Divider,
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
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const classes = useStyles();
  const categories = useSelector((state) => state.category.categories);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [stackCreated, setStackCreated] = useState(false);
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
        .then(() => history.push("/brainfolio"))
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

  useEffect(() => console.log(cards), [cards]);

  return (
    <Paper className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} display={stackCreated ? "none" : ""}>
          <Box>
            <Box marginBottom={2}>
              <Typography
                variant="button"
                align="start"
                sx={{
                  fontSize: 18,
                }}
              >
                Name your stack
              </Typography>
            </Box>
            <TextField
              fullWidth
              inputProps={{ sx: { fontSize: "25px" } }}
              variant="outlined"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box>
            <Box marginBottom={2}>
              <Typography
                variant="button"
                sx={{
                  fontSize: 18,
                }}
              >
                Select a category
              </Typography>
            </Box>
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

        <Divider sx={{ margin: 4 }} />
        <Box>
          <Box marginBottom={2}>
            <Typography
              variant="button"
              sx={{
                fontSize: 18,
              }}
            >
              Create your cards
            </Typography>
          </Box>
          {cards &&
            Object.keys(cards).map((cardNumber) => {
              const card = cards[cardNumber];

              return (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={5.5}>
                      <Typography align="center" gutterBottom={1}>
                        Question
                      </Typography>
                      <Paper sx={{ minHeight: 250 }}>
                        <TextField
                          value={card.term}
                          onChange={(e) => updateCardTerm(e, cardNumber)}
                          multiline
                          variant="outlined"
                          minRows={10}
                          fullWidth
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={5.5}>
                      <Typography align="center" gutterBottom={1}>
                        Answer
                      </Typography>
                      <Paper sx={{ minHeight: 250 }}>
                        <TextField
                          value={card.response}
                          onChange={(e) => updateCardResponse(e, cardNumber)}
                          multiline
                          variant="outlined"
                          minRows={10}
                          fullWidth
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        height="100%"
                        spacing={1}
                      >
                        <Button variant="outlined">Lock</Button>
                        <Button variant="contained" color="error">
                          Delete
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box height={20} />
                </>
              );
            })}
          <Divider sx={{ margin: 4 }} />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Box>
              <Button fullWidth variant="outlined" onClick={addCard}>
                Add card
              </Button>
            </Box>
            <Box>
              <Button
                color="error"
                fullWidth
                variant="contained"
                onClick={() => history.push("/brainfolio")}
              >
                Cancel
              </Button>
            </Box>
            <Box>
              <Button type="submit" fullWidth variant="contained">
                Create stack
              </Button>
            </Box>
          </Stack>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateStackPage;
