import {
  Grid,
  Stack as MuiStack,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
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
    <MuiStack>
      <MuiStack>
        <Typography variant="h2" color="secondary" gutterBottom={1}>
          Newest stacks
        </Typography>
      </MuiStack>
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
    </MuiStack>
  );
};

export default NewestStacks;
