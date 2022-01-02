import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, fetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6E6658",
    },
    secondary: {
      main: "#c66b3d",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
        },
      },
    },
  },
});

function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
