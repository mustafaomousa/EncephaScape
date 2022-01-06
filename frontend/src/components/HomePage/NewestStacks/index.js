import { Grid, Stack as MuiStack, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Stack from "../../Stack";
import { fetch } from "../../../store/csrf";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "0.3em",
  },
}));

const NewestStacks = () => {
  const classes = useStyles();
  const [newestStacks, setNewestStacks] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/stacks/");
      if (response.ok) return setNewestStacks(response.data.newestStacks);
    })();
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {newestStacks ? (
          newestStacks.map((stack) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <Stack stack={stack} />
              </Box>
            </Grid>
          ))
        ) : (
          <>
            <Grid item xs={12}>
              <Skeleton height={250} variant="rectangular" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={250} variant="rectangular" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={250} variant="rectangular" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={250} variant="rectangular" />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default NewestStacks;
