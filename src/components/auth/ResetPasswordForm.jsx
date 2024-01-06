import { Box, Heading, Text, Flex, Button, Link } from "@chakra-ui/react";
import TextInput from "./components/form/TextInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../utils/regex";
const loginSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        regex.email,
        "Vă rugăm să introduceți o adresă de email validă. Formatul corect este nume@domeniu.com"
      )
      .required()
      .typeError(
        "Vă rugăm să introduceți o adresă de email validă. Formatul corect este nume@domeniu.com"
      ),
    password: yup
      .string()
      .matches(
        regex.password,
        "Parola trebuie să aibă minim 8 caractere, inclusiv cel puțin o literă mare și un număr."
      )
      .typeError(
        "Parola trebuie să aibă minim 8 caractere, inclusiv cel puțin o literă mare și un număr."
      ),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  console.log("Errors are: ", errors);
  return (
    <Flex
      w="calc(100vw - 32px)"
      h="calc(100vh - 32px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxWidth="450px">
        <Heading>Resetare Parolă</Heading>
        <Text color="gray" marginBottom="32px">
          Introdu emailul tău pentru a primi un link de resetare a parolei.
        </Text>
        <form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
          <TextInput
            label="Email"
            type="email"
            error={errors["email"]}
            name="email"
            register={register}
            helperText="Introduceți adresa de email asociată contului dvs. (ex: nume@domeniu.com)"
            elementProps={{ marginBottom: "24px" }}
          />
          <Button type="submit" colorScheme="primary" w="100%">
            Resetează parola
          </Button>
          <Box>
            <Text
              color="primary.600"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Autentificare
            </Text>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}

export default Login;
