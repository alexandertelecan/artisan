import React from "react";
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
} from "@chakra-ui/react";
import { getDocumentsWithId } from "../../../utils/firebase";
import MainModal from "../common/MainModal";

export default function ExistingInvoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState();
  console.log(selectedInvoice);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentsWithId("invoices");
      setInvoices(response);
    };
    fetchData();
  }, []);

  const modifyStockModalDisclosure = useDisclosure();

  const handleModalOpenModify = (invoice) => {
    setSelectedInvoice(invoice);
    modifyStockModalDisclosure.onOpen();
  };

  return (
    <Box>
      <Heading size="sm" color="primary.600">
        Stoc existent
      </Heading>

      <TableContainer mt={"24px"} height={"75dvh"} overflowY={"scroll"}>
        <Table variant="simple">
          <Thead
            position={"sticky"}
            top={0}
            left={0}
            bg={"white"}
            zIndex={"100"}
          >
            <Tr>
              <Th>Client</Th>
              <Th>Data</Th>
              <Th>Total</Th>
              <Th>Actiune</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoices &&
              invoices.map((invoice) => (
                <Tr key={invoice.id}>
                  <Td>{invoice.clientBusiness.clientName}</Td>
                  <Td>{invoice.date.formattedDate}</Td>
                  <Td>{invoice.total} lei</Td>
                  <Td>
                    <Button
                      onClick={() => handleModalOpenModify(invoice)}
                      colorScheme="primary"
                    >
                      Detalii
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <MainModal
        disclosure={modifyStockModalDisclosure}
        title={"Detalii factura"}
      >
        <Box mt="24px">
          <Box marginBottom={"20px"}>
            <Heading marginBottom={"12px"} size="sm" color="primary.600">
              Detalii client
            </Heading>
            <Text>Nume: {selectedInvoice?.clientBusiness?.clientName}</Text>
            <Text>CIF/CNP: {selectedInvoice?.clientBusiness?.cifCnp}</Text>
            <Text>
              Numar de telefon: {selectedInvoice?.clientBusiness?.phoneNumber}{" "}
            </Text>
          </Box>
          <Box marginBottom={"20px"}>
            <Heading marginBottom={"12px"} size="sm" color="primary.600">
              Adresa client
            </Heading>
            <Text>Judet: {selectedInvoice?.clientAddress?.county}</Text>
            <Text>CIF/CNP: {selectedInvoice?.clientAddress?.city}</Text>
            <Text>Nume: {selectedInvoice?.clientAddress?.addressDetails}</Text>
          </Box>
          <Box marginBottom={"20px"}>
            <Heading marginBottom={"12px"} size="sm" color="primary.600">
              Data
            </Heading>
            <Text>{selectedInvoice?.date?.formattedDate}</Text>
          </Box>

          <Box marginBottom={"20px"}>
            <Heading marginBottom={"12px"} size="sm" color="primary.600">
              Produse
            </Heading>
            <TableContainer overflowY={"scroll"}>
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
                    <Th>Cantitate</Th>
                    <Th>Pret per unitate</Th>
                    <Th>Subtotal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedInvoice?.products &&
                    selectedInvoice?.products.map((product) => (
                      <Tr key={product.product}>
                        <Td>{product.product}</Td>
                        <Td>{product.quantity}</Td>
                        <Td>{product.price}</Td>
                        <Td>{product.subtotalPrice} lei</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Box marginBottom={"20px"}>
            <Heading marginBottom={"12px"} size="sm" color="primary.600">
              Total
            </Heading>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {selectedInvoice?.total} lei
            </Text>
          </Box>
        </Box>
      </MainModal>
    </Box>
  );
}
