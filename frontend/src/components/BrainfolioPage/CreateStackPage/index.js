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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <>
      <Typography color="secondary" variant="h3" gutterBottom={1}>
        Create a stack
      </Typography>
      <Box sx={{ backgroundColor: "rgba(0,0,0,0.2)", padding: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} display={stackCreated ? "none" : ""}>
            <Box>
              <Box marginBottom={2}>
                <Typography
                  variant="h4"
                  align="start"
                  color="secondary"
                  fontStyle="italic"
                >
                  1. Name your stack
                </Typography>
              </Box>
              <TextField
                fullWidth
                inputProps={{
                  sx: {
                    fontSize: "25px",
                    color: "#fff",
                    borderBottom: "#fff",
                  },
                }}
                variant="filled"
                color="secondary"
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
                <Typography variant="h4" color="secondary" fontStyle="italic">
                  2. Select a category
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
                        color="secondary"
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
              <Typography variant="h4" color="secondary" fontStyle={"italic"}>
                3. Create your cards
              </Typography>
            </Box>
            {cards &&
              Object.keys(cards).map((cardNumber) => {
                const card = cards[cardNumber];

                return (
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs={5.5}>
                        <Typography
                          align="start"
                          color="secondary"
                          variant="h5"
                          gutterBottom={1}
                        >
                          Question
                        </Typography>
                        <TextField
                          value={card.term}
                          onChange={(e) => updateCardTerm(e, cardNumber)}
                          multiline
                          variant="outlined"
                          color="secondary"
                          minRows={10}
                          fullWidth
                          InputProps={{ sx: { color: "#fff" } }}
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.2)",
                            borderRadius: "0.2em",
                          }}
                        />
                      </Grid>
                      <Grid item xs={5.5}>
                        <Typography
                          align="start"
                          color="secondary"
                          variant="h5"
                          gutterBottom={1}
                        >
                          Answer
                        </Typography>
                        <TextField
                          value={card.response}
                          onChange={(e) => updateCardResponse(e, cardNumber)}
                          multiline
                          variant="outlined"
                          color="secondary"
                          minRows={10}
                          fullWidth
                          InputProps={{ sx: { color: "#fff" } }}
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.2)",
                            borderRadius: "0.2em",
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          justifyContent="flex-end"
                          alignItems="flex-end"
                          height="100%"
                          width="100%"
                          spacing={1}
                          fullWidth
                        >
                          <Button variant="outlined" fullWidth color="primary">
                            <LockOpenIcon />
                          </Button>
                          <Button variant="contained" fullWidth color="error">
                            <DeleteIcon />
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Box height={20} />
                  </>
                );
              })}
            <Divider sx={{ margin: 4 }} />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
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
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                alignItems="flex-end"
                width="100%"
              >
                <Button variant="contained" onClick={addCard}>
                  Add card
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  Create stack
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CreateStackPage;
