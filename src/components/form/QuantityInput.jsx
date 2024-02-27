import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
} from "@chakra-ui/react";
export default function QuantityInput({
  error,
  label,
  helperText,
  type,
  name,
  register,
  elementProps,
  placeholder,
  onChange,
}) {
  return (
    <FormControl isInvalid={error} marginBottom="24px" {...elementProps}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          placeholder={placeholder}
          type={
            type === "password" && !show
              ? "password"
              : type === "password"
              ? "text"
              : type
          }
          name={name}
          {...register(name)}
          id={name}
          onChange={onChange}
        />
      </InputGroup>
      {!error ? (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}
