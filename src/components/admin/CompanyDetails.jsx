import React from "react";
import { getDocumentsWithId, updateDocument } from "../../../utils/firebase";
import { Box, Heading, Flex, Button, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import TextInput from "../form/TextInput";

const adminCompanySchema = yup
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
      .string(
        "Codul poștal introdus este invalid. Te rugăm să verifici și să reintroduci un cod poștal corect."
      )
      .required()
      .matches(
        regex.postCode,
        "Codul poștal introdus este invalid. Te rugăm să verifici și să reintroduci un cod poștal corect."
      ),
  })
  .required();

export default function CompanyDetails() {
  const [data, setData] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(adminCompanySchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentsWithId("company");
      setData(...response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);

    if (data) {
      const { admin, company } = data;
      for (const [key, value] of [
        ...Object.entries(admin),
        ...Object.entries(company),
        ...Object.entries(company.address),
      ]) {
        if (key !== "address") {
          setValue(key, value);
        }
      }
    }
  }, [data]);

  const onAdminSubmit = async (values) => {
    const adminData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
    };

    const companyData = {
      companyName: values.companyName.trim(),
      companyNumber: values.companyNumber.trim(),
      address: {
        street: values.street.trim(),
        county: values.county.trim(),
        city: values.city.trim(),
        postCode: values.postCode.trim(),
      },
    };

    const document = { admin: adminData, company: companyData };

    updateDocument("company", data.id, document).then(showToast());
  };

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Date schimbate",
      description: "Ati schimbat datele cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      colorScheme: "blue",
    });
  };

  if (data) {
    return (
      <Box height={"100%"} width={"800px"}>
        <Heading size="sm" color="primary.600">
          Datele Administratorului
        </Heading>
        <Box mt={"24px"}>
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
                  helperText="Numele administratorului."
                  elementProps={{ marginBottom: "24px" }}
                />

                <TextInput
                  label="Prenumele"
                  name="firstName"
                  register={register}
                  error={errors["firstName"]}
                  helperText="Prenumele administratorului."
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

            <Flex mt="24px" justifyContent="space-between">
              <Button
                colorScheme="primary"
                type="submit"
                display="block"
                isDisabled={!isValid || !isDirty}
              >
                Salvează
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    );
  }
}
