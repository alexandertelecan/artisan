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
      console.log("response is:", response);
      setUsers(response);
    };
    fetchData();
  }, []);

  const handleDeleteUser = (key) => {
    const response = deleteDocument("users", key);
    if (response) {
      const newUsers = users.filter((user) => user.id !== key);
      setUsers(newUsers);
    }
    deleteUserModalDisclosure.onClose();
  };

  const deleteUserModalDisclosure = useDisclosure();

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    console.log(selectedUser);
    deleteUserModalDisclosure.onOpen();
  };

  return (
    <Box>
      <Heading size="sm" color="primary.600">
        Utilizatori existenti
      </Heading>

      <TableContainer mt={"14px"} height={"600px"} overflowY={"scroll"}>
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
