import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts: {
    heading: `'Albert Sans', sans-serif`,
    body: `'Barlow', sans-serif`,
  },
  colors: {
    primary: {
      100: "#bfcae1",
      200: "#96a7cd",
      300: "#6d86b9",
      400: "#4b6cac",
      500: "#24539f",
      600: "#1c4b96",
      700: "#0f428a",
      800: "#03387e",
      900: "#002868",
    },
    secondary: {
      100: "#cecdf0",
      200: "#aeaee5",
      300: "#8e8dda",
      400: "#7772d1",
      500: "#6357c7",
      600: "#5c4fbd",
      700: "#5444b0",
      800: "#4c39a4",
      900: "#40258e",
    },
    tertiary: {
      100: "#bbc2d7",
      200: "#909bbc",
      300: "#6676a2",
      400: "#465a90",
      500: "#24407f",
      600: "#1e3977",
      700: "#14306d",
      800: "#0c2760",
      900: "#01184a",
    },
    quaternary: {
      100: "#e1bf9b",
      200: "#cc9558",
      300: "#b76d11",
      400: "#aa5300",
      500: "#9c3800",
      600: "#9a2d00",
      700: "#951a00",
      800: "#8e0000",
      900: "#840000",
    },
  },
});

export default theme;
