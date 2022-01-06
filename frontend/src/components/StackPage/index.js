import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch } from "../../store/csrf";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "140px 40px",
  },
  stackPageSection: {
    paddingBottom: "40px",
    maxWidth: 1200,
    width: "100%",
  },
  stackHeaderContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "30px 100px",
    maxWidth: 1200,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const StackPage = () => {
  const classes = useStyles();
  const [stack, setStack] = useState(null);
  const [index, setIndex] = useState(0);
  const { stackId } = useParams();

  const onIndexChange = (e, newValue) => {
    e.preventDefault();
    setIndex(newValue);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/stacks/${stackId}`);

      return setStack(response.data.stack);
    })();
  }, [stackId]);

  return (
    <Box className={classes.root}>
      <Box className={classes.stackPageSection}>
        {stack && (
          <Typography variant="h2" color="#fff" fontWeight="bold">
            {stack.name}
            <Typography variant="h5" color="secondary" fontWeight="bold">
              by {stack.User.username}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box className={classes.stackPageSection}>
        <Grid container>
          <Grid item container xs={12}>
            <Box width="100%">
              <Tabs
                value={index}
                onChange={onIndexChange}
                orientation="fullWidth"
                variant="scrollable"
                textColor="secondary"
                indicatorColor="secondary"
                TabScrollButtonProps={{ sx: { color: "#ffffff" } }}
                TabIndicatorProps={{ sx: { height: "100%" } }}
                sx={{
                  maxHeight: 700,
                  backgroundColor: "#333333",
                  width: "100%",
                }}
              >
                {stack &&
                  stack.Cards.map((card, i) => (
                    <Tab
                      label={
                        <Typography
                          variant="body1"
                          color={"#ffffff"}
                          sx={{ zIndex: 10000 }}
                        >
                          {i + 1}
                        </Typography>
                      }
                      {...a11yProps(card.id)}
                    />
                  ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "#ffffff" }}>
            {stack &&
              stack.Cards.map((card, i) => {
                return (
                  <TabPanel value={index} index={i}>
                    <Stack direction="column" spacing={5}>
                      <Stack>
                        <Typography
                          variant="h4"
                          color="secondary"
                          gutterBottom={1}
                          fontWeight="bold"
                        >
                          Question:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="primary"
                          sx={{ wordBreak: "break-word" }}
                          paragraph={true}
                        >
                          {card.term}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          variant="h4"
                          color="secondary"
                          gutterBottom={1}
                          fontWeight="bold"
                        >
                          Answer:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="primary"
                          sx={{ wordBreak: "break-word" }}
                          paragraph={true}
                        >
                          {card.response}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TabPanel>
                );
              })}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.stackPageSection}>
        {stack && (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              color="secondary"
              variant="contained"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Back
            </Button>
            <Button
              color="secondary"
              variant="contained"
              disabled={stack.Cards.length - 1 === index}
              onClick={() => setIndex(index + 1)}
            >
              Next
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default StackPage;
