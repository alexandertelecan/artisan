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
import NewUser from "../components/admin/NewUser";
import ExistingUsers from "../components/admin/ExistingUsers";
import CompanyDetails from "../components/admin/CompanyDetails";
import MainMenu from "../components/menu/MainMenu";

export default function AdminPanel() {
  return (
    <Box position={"fixed"} left={"20dvw"} width={"80dvw"} height={"100dvh"}>
      <MainMenu />
      <Flex alignItems="center" justifyContent="center">
        <Box width={"100%"} height={"100vh"}>
          <Box padding="16px">
            <Box paddingLeft={"16px"}>
              <Heading size="md">Panoul de Administrare</Heading>
              <Text fontSize="md" color="gray">
                Gestonare a bazei de date
              </Text>
            </Box>
            <Box marginTop={"12px"}>
              <Tabs>
                <TabList>
                  <Tab>Utilizatori</Tab>
                  <Tab>Adauga utilizator</Tab>
                  <Tab>Date Companie</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <ExistingUsers />
                  </TabPanel>
                  <TabPanel>
                    <NewUser />
                  </TabPanel>
                  <TabPanel>
                    <CompanyDetails />
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
