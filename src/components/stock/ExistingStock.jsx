import React, { useEffect } from "react";
import { useState } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  useDisclosure,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import MainModal from "../common/MainModal";
import {
  getDocumentsWithId,
  deleteDocument,
  getDocumentsInRealTime,
  updateDocument,
} from "../../../utils/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import regex from "../../../utils/regex";
import TextInput from "../form/TextInput";
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
        regex.price,
        "Pretul introdus este invalid. Te rugăm să reintroduci un pret corect."
      ),
  })
  .required();

export default function ExistingStock() {
  const [stocks, setStocks] = useState();
  const [selectedStock, setSelectedStock] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentsWithId("stock");
      setStocks(response);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(newStockSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    console.log("selected stocks:", selectedStock);

    if (selectedStock) {
      const { stock } = selectedStock;
      for (const [key, value] of [...Object.entries(stock)]) {
        setValue(key, value);
      }
    }
  }, [selectedStock]);

  const handleDeleteStock = (key) => {
    const response = deleteDocument("stock", key);
    if (response) {
      const newStocks = stocks.filter((stock) => stock.id !== key);
      setStocks(newStocks);
      showToastDelete();
    }
    deleteStockModalDisclosure.onClose();
  };

  const deleteStockModalDisclosure = useDisclosure();
  const modifyStockModalDisclosure = useDisclosure();

  const handleModifyStock = (values) => {
    const stock = {
      productName: values.productName.trim(),
      productID: values.productID.trim(),
      unit: values.unit.trim(),
      price: values.price.trim(),
    };
    const document = { stock };
    updateDocument("stock", selectedStock.id, document).then(showToastModify());
  };

  const handleModalOpenDelete = (stock) => {
    setSelectedStock(stock);
    deleteStockModalDisclosure.onOpen();
  };

  const handleModalOpenModify = (stock) => {
    setSelectedStock(stock);
    modifyStockModalDisclosure.onOpen();
  };

  const toast = useToast();

  const showToastDelete = () => {
    toast({
      title: "Stoc sters",
      description: "Ati sters stocul cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      colorScheme: "red",
    });
  };
  const showToastModify = () => {
    toast({
      title: "Stoc modificat",
      description: "Ati modificat stocul cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
      colorScheme: "blue",
    });
  };

  return (
    <Box>
      <Heading size="sm" color="primary.600">
        Stoc existent
      </Heading>

      <TableContainer mt={"24px"} height={"600px"} overflowY={"scroll"}>
        <Table variant="simple">
          <Thead
            position={"sticky"}
            top={0}
            left={0}
            bg={"white"}
            zIndex={"100"}
          >
            <Tr>
              <Th>Produs</Th>
              <Th>ID Produs</Th>
              <Th>Unitate</Th>
              <Th>Pret</Th>
              <Th>Actiune</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stocks &&
              stocks.map((stock) => (
                <Tr key={stock.id}>
                  <Td>{stock.stock.productName}</Td>
                  <Td>{stock.stock.productID}</Td>
                  <Td>{stock.stock.unit}</Td>
                  <Td>{stock.stock.price}</Td>
                  <Td>
                    <Button
                      onClick={() => handleModalOpenModify(stock)}
                      colorScheme="primary"
                    >
                      Modifica
                    </Button>
                    <Button
                      onClick={() => handleModalOpenDelete(stock)}
                      colorScheme="red"
                      marginLeft={"12px"}
                    >
                      Sterge
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <MainModal
        disclosure={deleteStockModalDisclosure}
        title={"ATENTIE!"}
        primaryBtn={
          <Button
            onClick={() => {
              handleDeleteStock(selectedStock.id);
            }}
            colorScheme="red"
          >
            STERGE
          </Button>
        }
        secondaryBtn={
          <Button
            colorScheme="primary"
            onClick={deleteStockModalDisclosure.onClose}
          >
            Inchide
          </Button>
        }
      >
        <Text>Esti pe cale sa stergi permanent stocul:</Text>
        <Text color={"red"}>
          Nume produs :{selectedStock?.stock?.productName}
          <br />
          ID produs:{selectedStock?.stock?.productID}
        </Text>
      </MainModal>
      <MainModal
        disclosure={modifyStockModalDisclosure}
        title={"Modifica stocul"}
      >
        <Box mt="24px">
          <form onSubmit={handleSubmit(handleModifyStock)} noValidate>
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
                colorScheme="green"
                type="submit"
                display="block"
                isDisabled={!isValid || !isDirty}
              >
                Modifica
              </Button>
              <Button
                colorScheme="primary"
                mr={3}
                onClick={modifyStockModalDisclosure.onClose}
              >
                Inchide
              </Button>
            </Flex>
          </form>
        </Box>
      </MainModal>
    </Box>
  );
}
