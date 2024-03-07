import React from "react";
import {
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Heading,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  MdLock,
  MdAdminPanelSettings,
  MdContentPaste,
  MdAttachMoney,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../../../utils/firebase";
import { Context } from "../context/AuthContext";
import { useContext } from "react";

export default function MainMenu() {
  const { user } = useContext(Context);

  return (
    <Box
      borderRight={"1px solid grey"}
      height={"100vh"}
      width={"20vw"}
      position={"fixed"}
      left={"0"}
      top={"0"}
      padding={"32px"}
      bg={"linear-gradient(186deg, #F89A29 0%, #FF6B0B 100%);"}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box>
          <Box>
            <Flex alignItems={"center"}>
              <Image
                src="Artisan Logo Transparent.png"
                alt="Artisan Logo"
                boxSize="80px"
                objectFit="contain"
              />
              {/* <Heading size="2xl" color="black" marginLeft={"12px"}>
                Artisan
              </Heading> */}
            </Flex>
          </Box>
          <Box marginTop={"32px"}>
            <Flex flexDirection={"column"}>
              <Heading size="md" color="primary.600">
                Meniu utilizator
              </Heading>

              <List fontSize={"1.2em"} spacing={8} marginTop={"32px"}>
                {!user && (
                  <ListItem
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ color: "primary.600" }}
                  >
                    <Button
                      variant={"link"}
                      _hover={{ color: "primary.600" }}
                      size={"lg"}
                    >
                      <Icon
                        as={MdLock}
                        boxSize={5}
                        marginRight={"6px"}
                        color={"gray.300"}
                      />
                      <NavLink to={"/auth"}>
                        <Text color={"white"} _hover={{ color: "primary.600" }}>
                          Auth
                        </Text>
                      </NavLink>
                    </Button>
                  </ListItem>
                )}
                {user && (
                  <ListItem
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ color: "primary.600" }}
                  >
                    <Button
                      variant={"link"}
                      _hover={{ color: "primary.600" }}
                      size={"lg"}
                    >
                      <Icon
                        as={MdAdminPanelSettings}
                        boxSize={5}
                        marginRight={"6px"}
                        color={"gray.300"}
                      />
                      <NavLink to={"/admin"}>
                        <Text color={"white"} _hover={{ color: "primary.600" }}>
                          Admin
                        </Text>
                      </NavLink>
                    </Button>
                  </ListItem>
                )}

                {user && (
                  <ListItem
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ color: "primary.600" }}
                  >
                    <Button
                      variant={"link"}
                      _hover={{ color: "primary.600" }}
                      size={"lg"}
                    >
                      <Icon
                        as={MdContentPaste}
                        boxSize={5}
                        marginRight={"6px"}
                        color={"gray.300"}
                      />
                      <NavLink to={"/stock"}>
                        <Text color={"white"} _hover={{ color: "primary.600" }}>
                          Stock
                        </Text>
                      </NavLink>
                    </Button>
                  </ListItem>
                )}
                {user && (
                  <ListItem
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ color: "primary.600" }}
                  >
                    <Button
                      variant={"link"}
                      _hover={{ color: "primary.600" }}
                      size={"lg"}
                    >
                      <Icon
                        as={MdAttachMoney}
                        boxSize={5}
                        marginRight={"6px"}
                        color={"gray.300"}
                      />
                      <NavLink to={"/invoices"}>
                        <Text color={"white"} _hover={{ color: "primary.600" }}>
                          Facturi
                        </Text>
                      </NavLink>
                    </Button>
                  </ListItem>
                )}
              </List>
            </Flex>
          </Box>
        </Box>

        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            {user && (
              <Button onClick={signOutUser} colorScheme="primary">
                Log out
              </Button>
            )}
            <Text>Artisan 2024©</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
