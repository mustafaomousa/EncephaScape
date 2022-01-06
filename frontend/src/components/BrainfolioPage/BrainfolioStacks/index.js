import { Grid, Zoom } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Stack from "../../Stack";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "0.3em",
  },
}));

const BrainfolioStacks = ({ stacks }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={4}>
        {stacks &&
          Object.keys(stacks).map((stackId, i) => {
            const stack = stacks[stackId];
            return (
              <Zoom
                in={true}
                style={{ transitionDelay: `${i === 0 ? 25 : i * 50}ms` }}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Stack stack={stack} />
                </Grid>
              </Zoom>
            );
          })}
      </Grid>
    </Box>
  );
};

export default BrainfolioStacks;
