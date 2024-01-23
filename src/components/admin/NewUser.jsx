import React from "react";
import { useForm } from "react-hook-form";
import { Box, Heading, Flex, Button, useToast } from "@chakra-ui/react";
import TextInput from "../form/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import regex from "../../../utils/regex";
import { addDocument, createEmailAndPassUser } from "../../../utils/firebase";

const newUserSchema = yup
  .object({
    firstName: yup
      .string()
      .required(
        "Prenumele introdus este invalid. Te rugăm să reintroduci un prenume corect."
      ),
    lastName: yup
      .string()
      .required(
        "Numele de familie introdus este invalid. Te rugăm să reintroduci un nume de familie corect."
      ),
    email: yup
      .string()
      .required(
        "Adresa de email introdusă este invalidă. Te rugăm să reintroduci o adresă de email corectă."
      )
      .matches(
        regex.email,
        "Adresa de email introdusă este invalidă. Te rugăm să reintroduci o adresă de email corectă."
      ),
    password: yup
      .string()
      .required(
        "Parola introdusă nu îndeplinește cerințele. Te rugăm să reintroduci o parolă care să aibă minim 8 caractere, inclusiv o literă mare și un număr."
      )
      .matches(
        regex.password,
        "Parola introdusă nu îndeplinește cerințele. Te rugăm să reintroduci o parolă care să aibă minim 8 caractere, inclusiv o literă mare și un număr."
      ),
    confirmPassword: yup
      .string()
      .required(
        "Parolele nu se potrivesc. Te rugăm să te asiguri că ambele parole introduse sunt identice."
      )
      .oneOf(
        [yup.ref("password"), null],
        "Parolele nu se potrivesc. Te rugăm să te asiguri că ambele parole introduse sunt identice."
      ),
  })
  .required();

export default function NewUser() {
  const [data, setData] = React.useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(newUserSchema),
    defaultValues: {
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      email: data?.user?.email,
      password: data?.user?.password,
      confirmPassword: data?.user?.confirmPassword,
    },
    mode: "onBlur",
  });

  const onUserSubmit = async (values) => {
    const userData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
    };

    const authData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    const document = {
      ...data,
      user: userData,
    };

    const authResponse = await createEmailAndPassUser(
      authData.email,
      authData.password
    );

    const response = await addDocument("users", document);
    if (response && authResponse) {
    }

    reset();
  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Utilizator adaugat",
      description: "Ati adaugat utilizatorul cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <Box height={"100%"}>
      <Heading size="sm" color="primary.600">
        Adauga un nou utilizator
      </Heading>
      <Box mt="24px">
        <form onSubmit={handleSubmit(onUserSubmit)} noValidate>
          <Flex
            flexDirection="row"
            alignItems="space-between"
            justifyContent="space-between"
          >
            <Flex
              gap={5}
              flexDirection={{ base: "column", md: "row" }}
              width="100%"
            >
              <TextInput
                label="Numele de Familie"
                name="lastName"
                register={register}
                error={errors["lastName"]}
                helperText="Introdu numele de familie al utilizatorului."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="Prenumele"
                name="firstName"
                register={register}
                error={errors["firstName"]}
                helperText="Numele de familie introdus este invalid. Te rugăm să reintroduci un nume de familie corect."
                elementProps={{ marginBottom: "24px" }}
              />
            </Flex>
          </Flex>
          <TextInput
            label="Email"
            name="email"
            register={register}
            error={errors["email"]}
            helperText="Introdu adresa de email a utilizatorului."
            elementProps={{ marginBottom: "24px" }}
          />
          <Flex gap={5} flexDirection={{ base: "column", md: "row" }}>
            <TextInput
              label="Parola"
              name="password"
              type="password"
              register={register}
              error={errors["password"]}
              helperText="Creează o parolă sigură, cu minim 8 caractere, incluzând o literă mare și un număr."
              elementProps={{ marginBottom: "24px" }}
            />
            <TextInput
              label="Confirmă Parola"
              name="confirmPassword"
              register={register}
              error={errors["confirmPassword"]}
              helperText="Reintrodu parola pentru confirmare."
              elementProps={{ marginBottom: "24px" }}
              type="password"
            />
          </Flex>
          <Flex mt="24px" justifyContent="space-between">
            <Button
              colorScheme="primary"
              type="submit"
              display="block"
              // isDisabled={!isValid || !isDirty}
              onClick={showToast}
            >
              Confirmă
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
