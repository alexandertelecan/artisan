import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import NewStock from "../components/stock/NewStock";
import ExistingStock from "../components/stock/ExistingStock";
import MainMenu from "../components/menu/MainMenu";
export default function Stock() {
  return (
    <Box position={"fixed"} left={"20dvw"} width={"80dvw"} height={"100dvh"}>
      <Flex alignItems="center" justifyContent="center">
        <MainMenu />
        <Box width={"100%"} height={"100vh"}>
          <Box padding="16px">
            <Box paddingLeft={"16px"}>
              <Heading size="md">Stoc</Heading>
              <Text fontSize="md" color="gray">
                Gestonare a stocului
              </Text>
            </Box>
            <Box marginTop={"12px"}>
              <Tabs>
                <TabList>
                  <Tab>Stoc existent</Tab>
                  <Tab>Stoc nou</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <ExistingStock />
                  </TabPanel>
                  <TabPanel>
                    <NewStock />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
