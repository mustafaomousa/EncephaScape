import { Box, Button, Grid, Grow, Zoom } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../../store/csrf";

const useStyles = makeStyles(() => ({
  categoryButton: {},
}));

const Categories = () => {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("/api/categories").then((response) => {
        if (response.ok) {
          return setCategories(response.data.categories);
        }
      });
    })();
  }, []);
  return (
    <Box className={classes.root}>
      <Grid container spacing={1}>
        {categories &&
          categories.map((category, i) => (
            <Grid item>
              <Zoom
                in={true}
                style={{ transitionDelay: `${i === 0 ? 25 : i * 50}ms` }}
              >
                <Button
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    color: "#fff",
                  }}
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    history.push(`/stacks?category=${category.id}`)
                  }
                >
                  {category.name}
                </Button>
              </Zoom>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Categories;
