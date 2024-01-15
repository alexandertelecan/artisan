import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
export default function CompletedSetup() {
  return (
    <Box>
      <Heading size="md" mb="24px">
        Configurarea Completată
      </Heading>
      <Text color="gray" mb="8px">
        Felicitări! Ai finalizat procesul de configurare a companiei și a
        contului de administrator. Toate informațiile necesare au fost salvate
        cu succes. Acum poți începe să folosești aplicația.
      </Text>
      <Text color="gray" mb="8px">
        Dacă ai nevoie de ajustări suplimentare sau modificări ale datelor,
        acestea pot fi făcute din panoul de administrare.
      </Text>{" "}
      <Text color="gray">
        Îți dorim succes în utilizarea aplicației noastre!
      </Text>
      <Button colorScheme="green" mt="24px">
        Continuă
      </Button>
    </Box>
  );
}
