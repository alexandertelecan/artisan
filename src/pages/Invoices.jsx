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

export default function Invoices() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box border="1px solid lightgrey" borderRadius="8px" maxW={"100%"}>
        <Box padding="16px">
          <Box>
            <Heading size="md">Facturi</Heading>
            <Text fontSize="md" color="gray">
              Gestonare a facturilor
            </Text>
          </Box>
          <Box mt={{ base: "12px", md: "24px", xl: "48px" }}>
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
  );
}
