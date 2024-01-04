import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import theme from "../theme/theme.js";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layouts/Layout.jsx";
import "@fontsource/albert-sans";
import "@fontsource/barlow";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Layout>
        <App />
      </Layout>
    </ChakraProvider>
  </React.StrictMode>
);
