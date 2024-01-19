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

export default function AdminPanel() {
  const [data, setData] = React.useState({});

  const onUserSubmit = async (values) => {
    const userData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
    };
    const authData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    const document = {
      ...data,
      user: userData,
    };
    const authResponse = await createEmailAndPassUser(
      authData.email,
      authData.password
    );
    const response = await addDocument("user", document);

    // if (response && authResponse) {
    //   setStep(3);
    // }
  };

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
            <Heading size="md">Panoul de Administrare</Heading>
            <Text fontSize="md" color="gray">
              Gestonare utilizatori
            </Text>
          </Box>
          <Box mt={{ base: "12px", md: "24px", xl: "48px" }}>
            <Tabs>
              <TabList>
                <Tab>Utilizatori</Tab>
                <Tab>Adauga</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ExistingUsers />
                </TabPanel>
                <TabPanel>
                  <NewUser data={data} onUserSubmit={onUserSubmit} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
