import React from "react";
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

export default function ExistingUsers() {
  const [users, setUsers] = useState([
    {
      firstName: "Mihai",
      lastName: "Ciolan",
      email: "mihaiciolan@bing.com",
    },
    {
      firstName: "Ana",
      lastName: "Popescu",
      email: "anapopescu@gmail.com",
    },
    {
      firstName: "Radu",
      lastName: "Ionescu",
      email: "radu.ionescu@yahoo.com",
    },
    {
      firstName: "Elena",
      lastName: "Marin",
      email: "elenamarin@hotmail.com",
    },
    {
      firstName: "Alex",
      lastName: "Andrei",
      email: "alex.andrei@outlook.com",
    },
    {
      firstName: "Maria",
      lastName: "Georgescu",
      email: "mariageorgescu@gmail.com",
    },
    {
      firstName: "Victor",
      lastName: "Dumitru",
      email: "victordumitru@gmail.com",
    },
    {
      firstName: "Raluca",
      lastName: "Gheorghiu",
      email: "ralucagheorghiu@icloud.com",
    },
    {
      firstName: "Cristian",
      lastName: "Stanescu",
      email: "cristian.stanescu@live.com",
    },
    {
      firstName: "Andreea",
      lastName: "Munteanu",
      email: "andreeamunteanu@gmail.com",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (key) => {
    const newUsers = users.filter((user) => user.email !== key);
    setUsers(newUsers);
    deleteUserModalDisclosure.onClose();
  };

  const deleteUserModalDisclosure = useDisclosure();

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    deleteUserModalDisclosure.onOpen();
    console.log(selectedUser);
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
                <Tr key={user.email}>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
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
            onClick={() => handleDeleteUser(selectedUser.email)}
            colorScheme="red"
          >
            STERGE
          </Button>
        }
      >
        <Text>Esti pe cale sa stergi permanent utilizatorul:</Text>
        <Text color={"red"}>
          {selectedUser?.firstName} {selectedUser?.lastName}
        </Text>
      </MainModal>
    </Box>
  );
}
