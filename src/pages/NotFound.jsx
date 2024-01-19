import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Flex
      w={{ base: "auto", md: "calc(100dvw - 32px)" }}
      h={{ base: "auto", md: "calc(100dvh - 32px)" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box border="1px solid lightgrey" borderRadius="8px" maxW={"600px"}>
        <Box padding="16px">
          <Heading>Pagina nu a fost gasita</Heading>
          <Text color="gray" marginBottom="32px">
            Eroare 404 - Pagina Absentă: Ne pare rău că nu putem găsi ceea ce
            cauți. Te rugăm să verifici adresa URL și să înceri din nou sau să
            utilizezi meniul de navigare pentru a explora alte secțiuni ale
            site-ului.
          </Text>
          <Box>
            <Heading size="sm" color="primary.600">
              Catre pagina principala:
            </Heading>
            <br />
            <Button variant={"outline"} size={"md"}>
              <Link to={"/"}>Acasa →</Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
