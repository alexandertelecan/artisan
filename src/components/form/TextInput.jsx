import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function TextInput({
  error,
  label,
  helperText,
  type,
  name,
  register,
  elementProps,
  placeholder,
}) {
  const [show, setShow] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShow(!show);
  };
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
        />
        {type === "password" && (
          <InputRightElement>
            {!show ? (
              <ViewIcon
                cursor="pointer"
                color="gray.400"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <ViewOffIcon
                cursor="pointer"
                color="gray.400"
                onClick={togglePasswordVisibility}
              />
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {!error ? (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}
