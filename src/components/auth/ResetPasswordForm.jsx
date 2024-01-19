import { Box, Heading, Text, Flex, Button, Alert } from "@chakra-ui/react";
import TextInput from "../form/TextInput";
import React from "react";
import { AlertIcon } from "@chakra-ui/alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import { resetPassword } from "../../../utils/firebase";
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
  })
  .required();

function ResetPasswordForm({ navStep }) {
  const [showAlert, setShowAlert] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email.trim());
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      w="calc(100vw - 32px)"
      h="calc(100vh - 32px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxWidth="450px"
        border="1px solid lightgrey"
        borderRadius="8px"
        padding="16px"
      >
        <Heading>Resetare Parolă</Heading>
        <Text color="gray" marginBottom="32px">
          Introdu emailul tău pentru a primi un link de resetare a parolei.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextInput
            label="Email"
            type="email"
            error={errors["email"]}
            name="email"
            register={register}
            helperText="Introduceți adresa de email asociată contului dvs. (ex: nume@domeniu.com)"
            elementProps={{ marginBottom: "24px" }}
          />
          {showAlert && (
            <Alert status="success" variant="subtle" my="24px">
              <AlertIcon />
              Emailul a fost trimis cu succes! Te rugăm să urmezi pașii din
              email pentru a-ți reseta parola.
            </Alert>
          )}

          <Button
            type="submit"
            colorScheme="primary"
            w="100%"
            isDisabled={!isValid || !isDirty}
          >
            Resetează parola
          </Button>

          <Text
            color="primary.600"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => navStep(1)}
            textAlign="center"
          >
            Autentificare
          </Text>
        </form>
      </Box>
    </Flex>
  );
}

export default ResetPasswordForm;
