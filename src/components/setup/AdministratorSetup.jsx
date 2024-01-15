import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import TextInput from "../form/TextInput";

const adminSchema = yup
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

export default function AdministratorSetup({
  data,
  onAdminSubmit,
  returnToStep,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(adminSchema),
    defaultValues: {
      firstName: data?.admin?.firstName,
      lastName: data?.admin?.lastName,
      email: data?.admin?.email,
      password: data?.admin?.password,
      confirmPassword: data?.admin?.confirmPassword,
    },
    mode: "onBlur",
  });
  return (
    <Box mt="48px">
      <Heading size="sm" color="primary.600">
        Pasul 2: Detalii Administrator
      </Heading>
      <Text fontSize="sm" color="gray">
        Completează informațiile necesare pentru contul de administrator,
        incluzând numele, adresa de email și parola.
      </Text>
      <Box mt="24px">
        <form onSubmit={handleSubmit(onAdminSubmit)} noValidate>
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
                helperText="Introdu numele de familie al administratorului."
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
            helperText="Introdu adresa de email a administratorului."
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
              colorScheme="gray"
              display="block"
              onClick={() => returnToStep(1)}
            >
              Înapoi
            </Button>
            <Button
              colorScheme="primary"
              type="submit"
              display="block"
              isDisabled={!isValid || !isDirty}
            >
              Confirmă
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
