import React from "react";
import {
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  List,
  ListItem,
  Heading,
  Box,
} from "@chakra-ui/react";
import {
  MdDashboard,
  MdOutlineSettings,
  MdLock,
  MdAdminPanelSettings,
  MdContentPaste,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function MainMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Box>
      <Button
        ref={btnRef}
        colorScheme="primary"
        onClick={onOpen}
        position={"fixed"}
      >
        Meniu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md" color="primary.600">
              Meniu utilizator
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <List color={"black"} fontSize={"1.2em"} spacing={4}>
              <ListItem display={"flex"} alignItems={"center"}>
                <Button
                  color={"black"}
                  onClick={onClose}
                  variant={"link"}
                  _hover={{ color: "primary.600" }}
                  size={"lg"}
                >
                  <Icon as={MdDashboard} boxSize={5} marginRight={"6px"} />
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </Button>
              </ListItem>
              <ListItem display={"flex"} alignItems={"center"}>
                <Button
                  color={"black"}
                  onClick={onClose}
                  variant={"link"}
                  _hover={{ color: "primary.600" }}
                  size={"lg"}
                >
                  <Icon
                    as={MdOutlineSettings}
                    boxSize={5}
                    marginRight={"6px"}
                  />
                  <NavLink to={"/setup"}>Setup</NavLink>
                </Button>
              </ListItem>
              <ListItem
                display={"flex"}
                alignItems={"center"}
                _hover={{ color: "primary.600" }}
              >
                <Button
                  color={"black"}
                  onClick={onClose}
                  variant={"link"}
                  _hover={{ color: "primary.600" }}
                  size={"lg"}
                >
                  <Icon as={MdLock} boxSize={5} marginRight={"6px"} />
                  <NavLink to={"/auth"}>Auth</NavLink>
                </Button>
              </ListItem>
              <ListItem
                display={"flex"}
                alignItems={"center"}
                _hover={{ color: "primary.600" }}
              >
                <Button
                  color={"black"}
                  onClick={onClose}
                  variant={"link"}
                  _hover={{ color: "primary.600" }}
                  size={"lg"}
                >
                  <Icon
                    as={MdAdminPanelSettings}
                    boxSize={5}
                    marginRight={"6px"}
                  />
                  <NavLink to={"/admin"}>Admin</NavLink>
                </Button>
              </ListItem>
              <ListItem
                display={"flex"}
                alignItems={"center"}
                _hover={{ color: "primary.600" }}
              >
                <Button
                  color={"black"}
                  onClick={onClose}
                  variant={"link"}
                  _hover={{ color: "primary.600" }}
                  size={"lg"}
                >
                  <Icon as={MdContentPaste} boxSize={5} marginRight={"6px"} />
                  <NavLink to={"/stock"}>Stock</NavLink>
                </Button>
              </ListItem>
            </List>
          </DrawerBody>
          <DrawerFooter>
            <Text>Artisan 2024</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
