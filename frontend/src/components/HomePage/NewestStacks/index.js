import { Box, Grid, Stack as MuiStack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Stack from "../../Stack";
import { fetch } from "../../../store/csrf";

const NewestStacks = () => {
  const [newestStacks, setNewestStacks] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/stacks/");

      if (response.ok) return setNewestStacks(response.data.newestStacks);
    })();
  }, []);

  return (
    <MuiStack direction="row" sx={{ maxWidth: 1200, height: "100%" }}>
      <MuiStack
        sx={{
          minHeight: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          marginRight: 2,
        }}
        justifyContent="center"
      >
        <Typography
          variant="h5"
          color="secondary"
          sx={{ transform: "rotate(-90deg)" }}
        >
          Recent
        </Typography>
      </MuiStack>
      <Grid container spacing={2}>
        {newestStacks &&
          newestStacks.map((stack) => (
            <Grid item>
              <Stack stack={stack} />
            </Grid>
          ))}
      </Grid>
    </MuiStack>
  );
};

export default NewestStacks;
