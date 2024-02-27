import React from "react";
import { useForm } from "react-hook-form";
import { Box, Heading, Flex, Button, useToast } from "@chakra-ui/react";
import TextInput from "../form/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import regex from "../../../utils/regex";
import { addDocument } from "../../../utils/firebase";

const newStockSchema = yup
  .object({
    productName: yup
      .string()
      .required(
        "Denumirea produsului introdus este invalida. Te rugăm să reintroduci o denumire corecta."
      ),
    productID: yup.string(
      "ID-ul produsului introdus este invalid. Te rugăm să reintroduci un ID corect."
    ),

    unit: yup
      .string()
      .required(
        "Unitatea de masura introdusa este invalida. Te rugăm să reintroduci o unitate de masura corecta."
      ),
    price: yup
      .string()
      .required(
        "Pretul introdus este invalid. Te rugăm să reintroduci un pret corect."
      )
      .matches(
        regex.numbers,
        "Pretul introdus este invalid. Te rugăm să reintroduci un pret corect."
      ),
  })
  .required();

export default function NewStock() {
  const [data, setData] = React.useState({});

  const onSubmit = async (values) => {
    const stockData = {
      productName: values.productName.trim(),
      productID: values.productID.trim(),
      unit: values.unit.trim(),
      price: values.price.trim(),
    };

    const document = {
      ...data,
      stock: stockData,
    };

    const response = await addDocument("stock", document);
    if (response) {
      showToast();
      reset();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(newStockSchema),
    defaultValues: {
      productName: data?.stock?.productName,
      productID: data?.stock?.productID,
      unit: data?.stock?.unit,
      price: data?.stock?.price,
    },
    mode: "onBlur",
  });

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Stoc adaugat",
      description: "Ati adaugat stocul cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <Box height={"100%"}>
      <Heading size="sm" color="primary.600">
        Adauga un nou tip de stoc
      </Heading>
      <Box mt="24px">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                label="Denumire produs"
                name="productName"
                register={register}
                error={errors["productName"]}
                helperText="Introdu denumirea produsului."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="ID produs"
                name="productID"
                register={register}
                error={errors["productID"]}
                helperText="Introdu ID-ul produsului."
                elementProps={{ marginBottom: "24px" }}
              />
            </Flex>
          </Flex>

          <Flex
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
            width="100%"
          >
            <TextInput
              label="Unitate de masura"
              name="unit"
              register={register}
              error={errors["unit"]}
              helperText="Introdu unitatea de masura a  produsului."
              elementProps={{ marginBottom: "24px" }}
            />
            <TextInput
              label="Pret unitar"
              name="price"
              register={register}
              error={errors["price"]}
              helperText="Introdu pretul unitar al produsului in RON."
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
              Confirmă
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
