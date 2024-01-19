import { Box } from "@chakra-ui/react";
import React from "react";
import MainMenu from "../menu/MainMenu";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Box>
      <MainMenu />
      <Outlet />
    </Box>
  );
}
