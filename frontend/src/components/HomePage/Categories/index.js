import { Box, Button, Grid, Grow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { fetch } from "../../../store/csrf";

const useStyles = makeStyles(() => ({
  categoryButton: {},
}));

const Categories = () => {
  const classes = useStyles();
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
          categories.map((category) => (
            <Grid item>
              <Grow in={true} timeout={1300}>
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
                >
                  {category.name}
                </Button>
              </Grow>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Categories;
