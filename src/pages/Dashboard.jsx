import {
  Box,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React from "react";

export default function Dashboard() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Flex
        w={{ base: "auto", md: "calc(100dvw - 32px)" }}
        h={{ base: "auto", md: "calc(100dvh - 32px)" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box border="1px solid lightgrey" borderRadius="8px" width={"800px"}>
          <Box padding="16px">
            <Box>
              <Heading size="md">Dashboard</Heading>
              <Text fontSize="md" color="gray">
                Panoul de informatii
              </Text>
            </Box>
            <Box mt={{ base: "12px", md: "24px", xl: "48px" }}>
              <Flex justifyContent={"space-evenly"} width={"100%"}>
                <Box
                  border="1px solid lightgrey"
                  borderRadius="8px"
                  padding="16px"
                  display={"inline-block"}
                >
                  <Stat>
                    <Heading size={"sm"} color={"primary.600"}>
                      Utilizatori
                    </Heading>
                    <br />
                    <StatLabel>Utilizatori curenti</StatLabel>
                    <StatNumber>4</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </Stat>
                </Box>
                <Box
                  border="1px solid lightgrey"
                  borderRadius="8px"
                  padding="16px"
                  display={"inline-block"}
                >
                  <Stat>
                    <Heading size={"sm"} color={"primary.600"}>
                      Produse
                    </Heading>
                    <br />
                    <StatLabel>Produse in stoc</StatLabel>
                    <StatNumber>15</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </Stat>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
