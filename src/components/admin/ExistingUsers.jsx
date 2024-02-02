import React, { useEffect } from "react";
import { useState } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import MainModal from "../common/MainModal";
import {
  getDocumentsWithId,
  deleteDocument,
  getDocumentsInRealTime,
} from "../../../utils/firebase";

export default function ExistingUsers() {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentsWithId("users");
      console.log("users:", users);
      setUsers(response);
    };
    fetchData();
  }, []);

  const handleDeleteUser = (key) => {
    const response = deleteDocument("users", key);
    if (response) {
      const newUsers = users.filter((user) => user.id !== key);
      setUsers(newUsers);
      showToast();
    }
    deleteUserModalDisclosure.onClose();
  };

  const deleteUserModalDisclosure = useDisclosure();

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    deleteUserModalDisclosure.onOpen();
  };

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Utilizator sters",
      description: "Ati sters utilizatorul cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      colorScheme: "red",
    });
  };

  return (
    <Box>
      <Heading size="sm" color="primary.600">
        Utilizatori existenti
      </Heading>

      <TableContainer mt={"24px"} height={"600px"} overflowY={"scroll"}>
        <Table variant="simple">
          <Thead
            position={"sticky"}
            top={0}
            left={0}
            bg={"white"}
            zIndex={"100"}
          >
            <Tr>
              <Th>Nume</Th>
              <Th>Prenume</Th>
              <Th>Email</Th>
              <Th>Actiune</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.user.firstName}</Td>
                  <Td>{user.user.lastName}</Td>
                  <Td>{user.user.email}</Td>
                  <Td>
                    <Button
                      onClick={() => handleModalOpen(user)}
                      colorScheme="primary"
                    >
                      Sterge
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <MainModal
        disclosure={deleteUserModalDisclosure}
        title={"ATENTIE!"}
        primaryBtn={
          <Button
            colorScheme="primary"
            mr={3}
            onClick={deleteUserModalDisclosure.onClose}
          >
            Inchide
          </Button>
        }
        secondaryBtn={
          <Button
            onClick={() => {
              handleDeleteUser(selectedUser.id);
            }}
            colorScheme="red"
          >
            STERGE
          </Button>
        }
      >
        <Text>Esti pe cale sa stergi permanent utilizatorul:</Text>
        <Text color={"red"}>
          {selectedUser?.user?.firstName} {selectedUser?.user?.lastName}
        </Text>
      </MainModal>
    </Box>
  );
}
