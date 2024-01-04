import { useState } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      w="calc(100vw - 32px)"
      h="calc(100vh - 32px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="500px">
        <Heading>Autentificare</Heading>
        <Text color="gray">
          Autentificați-vă pentru accesul în contul organizației
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
