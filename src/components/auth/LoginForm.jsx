import { Box, Heading, Text, Flex, Button, useToast } from "@chakra-ui/react";
import TextInput from "../form/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

export default function LoginForm({ navStep }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    const email = values.email.trim();
    const password = values.password.trim();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        showToast();
      });
  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Date incorecte",
      description: "Adresa de email sau parola introdusa incorect!",
      duration: 5000,
      isClosable: true,
      status: "error",
      position: "top",
    });
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
        <Heading>Autentificare</Heading>
        <Text color="gray" marginBottom="32px">
          Autentificați-vă pentru accesul în contul organizației.
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
          <TextInput
            label="Parola"
            type="password"
            error={errors["password"]}
            name="password"
            register={register}
            helperText="Introduceți parola asociată contului dvs. (ex: Parola1234)"
          />
          <Button
            type="submit"
            colorScheme="primary"
            w="100%"
            isDisabled={!isValid || !isDirty}
          >
            Submit
          </Button>

          <Flex
            justifyContent={"space-evenly"}
            alignItems={"center"}
            marginTop={"12px"}
          >
            <Text
              textAlign="center"
              color="primary.600"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => navStep(2)}
            >
              Resetează parola
            </Text>

            <Text
              textAlign="center"
              color="primary.600"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              <NavLink to={"/setup"}>Inregistrare</NavLink>
            </Text>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
