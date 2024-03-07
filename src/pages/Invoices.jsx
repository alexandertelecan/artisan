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
import ExistingInvoices from "../components/invoices/ExistingInvoices";
import NewInvoices from "../components/invoices/NewInvoices";
import MainMenu from "../components/menu/MainMenu";

export default function Invoices() {
  return (
    <Box position={"fixed"} left={"20dvw"} width={"80dvw"} height={"100dvh"}>
      <MainMenu />
      <Flex alignItems="center" justifyContent="center">
        <Box width={"100%"} height={"100vh"}>
          <Box padding="16px">
            <Box paddingLeft={"16px"}>
              <Heading size="md">Facturi</Heading>
              <Text fontSize="md" color="gray">
                Gestonare a facturilor
              </Text>
            </Box>
            <Box marginTop={"12px"}>
              <Tabs>
                <TabList>
                  <Tab>Facturi existente</Tab>
                  <Tab>Factura noua</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <ExistingInvoices />
                  </TabPanel>
                  <TabPanel>
                    <NewInvoices />
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
