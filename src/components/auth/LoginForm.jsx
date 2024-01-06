import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import TextInput from "../form/TextInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
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

function LoginForm({ navStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <Flex
      w="calc(100vw - 32px)"
      h="calc(100vh - 32px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxWidth="450px">
        <Heading>Autentificare</Heading>
        <Text color="gray" marginBottom="32px">
          Autentificați-vă pentru accesul în contul organizației.
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
          <TextInput
            label="Parola"
            type="password"
            error={errors["password"]}
            name="password"
            register={register}
          />
          <Button
            type="submit"
            colorScheme="primary"
            w="100%"
            isDisabled={!isValid || !isDirty}
          >
            Submit
          </Button>

          <Text
            textAlign="center"
            color="primary.600"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => navStep(2)}
          >
            Resetează parola
          </Text>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginForm;
