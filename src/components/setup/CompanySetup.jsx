import React from "react";
import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import TextInput from "../form/TextInput";

const companySchema = yup
  .object({
    companyName: yup
      .string()
      .required(
        "Numele companiei introdus este invalid. Te rugăm să verifici și să reintroduci numele corect."
      ),
    companyNumber: yup
      .string()
      .required(
        "CIF invalid. Te rugăm să introduci un cod de identificare fiscală corect, format din 2 până la 10 cifre."
      )
      .matches(
        regex.cif,
        "CIF invalid. Te rugăm să introduci un cod de identificare fiscală corect, format din 2 până la 10 cifre."
      )
      .typeError(
        "CIF invalid. Te rugăm să introduci un cod de identificare fiscală corect, format din 2 până la 10 cifre."
      ),
    street: yup
      .string()
      .required(
        "Numele străzii introdus este invalid. Te rugăm să verifici și să reintroduci."
      ),
    county: yup
      .string()
      .required(
        "Numele județului introdus este invalid. Te rugăm să verifici și să reintroduci numele corect al județului."
      ),
    city: yup
      .string()
      .required(
        "Numele orașului introdus este invalid. Te rugăm să verifici și să reintroduci."
      ),
    postCode: yup
      .string()
      .required(
        "Codul poștal introdus este invalid. Te rugăm să verifici și să reintroduci un cod poștal corect."
      )
      .matches(
        regex.postCode,
        "Codul poștal introdus este invalid. Te rugăm să verifici și să reintroduci un cod poștal corect."
      ),
  })
  .required();

export default function CompanySetup({ data, onCompanySubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(companySchema),
    defaultValues: {
      companyName: data?.company?.companyName,
      companyNumber: data?.company?.companyNumber,
      street: data?.company?.address?.street,
      county: data?.company?.address?.county,
      city: data?.company?.address?.city,
      postCode: data?.company?.address?.postCode,
    },
    mode: "onBlur",
  });

  return (
    <Box mt="48px">
      <Heading size="sm" color="primary.600">
        Pasul 1: Detalii Companie
      </Heading>
      <Text fontSize="sm" color="gray">
        Completează informațiile de bază ale companiei tale.
      </Text>
      <Box mt="24px">
        <form onSubmit={handleSubmit(onCompanySubmit)} noValidate>
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
                label="Nume Companie"
                name="companyName"
                register={register}
                error={errors["companyName"]}
                helperText="Introduceți numele companiei."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="Codul de Identificare Fiscala (CIF)"
                name="companyNumber"
                register={register}
                error={errors["companyNumber"]}
                helperText="Introdu CIF-ul companiei tale. Acesta este un cod unic de identificare fiscală, format din cifre, atribuit de ANAF."
                elementProps={{ marginBottom: "24px" }}
              />
            </Flex>
          </Flex>
          <Box>
            <Heading size="xs" color="primary.600" marginBottom="8px">
              Adresa Companiei
            </Heading>
            <Flex gap={5} flexDirection={{ base: "column", md: "row" }}>
              <TextInput
                label="Strada"
                name="street"
                register={register}
                error={errors["street"]}
                helperText="Introdu numele străzii și numărul clădirii."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="Județul"
                name="county"
                register={register}
                error={errors["county"]}
                helperText="Introdu județul în care se află compania."
                elementProps={{ marginBottom: "24px" }}
              />
            </Flex>
            <Flex gap={5} flexDirection={{ base: "column", md: "row" }}>
              <TextInput
                label="Orașul"
                name="city"
                register={register}
                error={errors["city"]}
                helperText="Introdu orașul în care este situată compania."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="Codul Poștal"
                name="postCode"
                register={register}
                error={errors["postCode"]}
                helperText="Introdu codul poștal asociat adresei companiei."
                elementProps={{ marginBottom: "24px" }}
              />
            </Flex>
          </Box>
          <Button
            colorScheme="primary"
            type="submit"
            display="block"
            marginTop="24px"
            marginLeft={{ md: "auto" }}
            isDisabled={!isValid}
          >
            Continuă
          </Button>
        </form>
      </Box>
    </Box>
  );
}
