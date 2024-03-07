import React from "react";
import MainMenu from "../components/menu/MainMenu";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
function LandingPage() {
  return (
    // <Box>
    //   <MainMenu />
    //   <Box>
    //     <Flex justifyContent={"center"} alignItems={"center"}>
    //       <Heading>Artisan</Heading>
    //     </Flex>
    //   </Box>
    // </Box>
    <Box position={"fixed"} left={"20dvw"} width={"80dvw"} height={"100dvh"}>
      <MainMenu />
      <Flex alignItems="center" justifyContent="center">
        <Box width={"100%"} height={"100vh"}>
          <Box padding="16px">
            <Box paddingLeft={"16px"}>
              <Heading size="2xl">Artisan</Heading>
              <Text fontSize="lg" color="gray">
                Artisan: Platforma integrată pentru gestionarea eficientă a
                stocurilor și facturilor, oferind instrumente avansate de
                monitorizare, raportare și optimizare pentru a îmbunătăți
                procesele de afaceri și a maximiza rentabilitatea.
              </Text>
              <Button colorScheme="primary" size={"lg"} marginTop={"16px"}>
                <NavLink to={"/admin"}>
                  <Flex>
                    <Text>Exploreaza</Text> <Text marginLeft={"8px"}>→</Text>
                  </Flex>
                </NavLink>
              </Button>
            </Box>
            <Box marginTop={"12px"}></Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingPage;
