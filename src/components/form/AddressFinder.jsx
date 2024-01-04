import React from "react";
import TextInput from "./TextInput";
import { Box, Text, Flex, Button, Progress } from "@chakra-ui/react";
export default function AddressFinder({ label, type, error, name, register }) {
  return (
    <Flex>
      <TextInput
        label={label}
        type={type}
        error={error}
        name={name}
        register={register}
      />
    </Flex>
  );
}
