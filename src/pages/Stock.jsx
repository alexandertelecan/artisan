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

export default function Stock() {
  return (
    <Flex
      w={{ base: "auto", md: "calc(100dvw - 32px)" }}
      h={{ base: "auto", md: "calc(100dvh - 32px)" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box border="1px solid lightgrey" borderRadius="8px" maxW={"100%"}>
        <Box padding="16px">
          <Box>
            <Heading size="md">Stoc</Heading>
            <Text fontSize="md" color="gray">
              Gestonare a stocului
            </Text>
          </Box>
          <Box mt={{ base: "12px", md: "24px", xl: "48px" }}>
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
  );
}
