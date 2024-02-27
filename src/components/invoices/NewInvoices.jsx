import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Box,
  Heading,
  Flex,
  Button,
  useToast,
  Text,
  Select,
} from "@chakra-ui/react";
import QuantityInput from "../form/QuantityInput";
import TextInput from "../form/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import regex from "../../../utils/regex";
import { addDocument, getDocumentsWithId } from "../../../utils/firebase";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const newInvoiceSchema = yup
  .object({
    clientName: yup.string().required("Nume incorect."),

    cifCnp: yup.string().required("CIF/CNP incorect."),

    phoneNumber: yup
      .string()
      .required("Numar incorect.")
      .matches(regex.numbers, "Numar incorect."),

    county: yup.string().required("Judet incorect."),

    city: yup.string().required("Oras incorect."),

    addressDetails: yup.string().required("Detalii adresa incorecte."),

    // quantity: yup
    //   .string()
    //   .required("Cantitate incorecta.")
    //   .matches(regex.numbers, "Cantitate incorecta."),
  })
  .required();

export default function NewInvoices() {
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDocumentsWithId("stock");
      setStocks(response);
    };
    fetchData();
  }, []);

  const [stocks, setStocks] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [data, setData] = React.useState({});

  const extractDateFromTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const formattedDate = `${day} ${getMonthName(month)} ${year}`;

    return formattedDate;
  };

  const getMonthName = (month) => {
    const months = [
      "Ianuarei",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octombrie",
      "Noiembrie",
      "Decembrie",
    ];
    return months[month - 1];
  };

  const timestamp = startDate;

  const formattedDate = extractDateFromTimestamp(timestamp);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="outline" marginTop={"-20px"} onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  const onSubmit = async (values) => {
    console.log(values);

    const clientBusinessData = {
      clientName: values.clientName.trim(),
      cifCnp: values.cifCnp.trim(),
      phoneNumber: values.phoneNumber.trim(),
    };

    const clientAddressData = {
      county: values.county.trim(),
      city: values.city.trim(),
      addressDetails: values.addressDetails.trim(),
    };

    const invoiceDate = {
      formattedDate,
    };

    const productsData = values.invoice;
    const totalPrice = values.total;

    const document = {
      ...data,
      clientBusiness: clientBusinessData,
      clientAddress: clientAddressData,
      date: invoiceDate,
      products: productsData,
      total: totalPrice,
    };

    const response = await addDocument("invoices", document);
    if (response) {
      showToast();
      reset();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(newInvoiceSchema),
    defaultValues: {
      clientName: data?.invoices?.clientName,
      cifCnp: data?.invoices?.cifCnp,
      phoneNumber: data?.invoices?.phoneNumber,
      county: data?.invoices?.county,
      city: data?.invoices?.city,
      addressDetails: data?.invoices?.addressDetails,
      invoice: [{ product: "", quantity: "", price: "", subtotalPrice: "" }],
      total: null,
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "invoice",
    control,
  });

  const [subtotal, setSubtotal] = React.useState({});
  const [total, setTotal] = React.useState();

  const handleQuantityOnchange = (e, index) => {
    const input = getValues(`invoice.${index}.product`);

    if (/^.+ \d+$/.test(input)) {
      const separateNameAndNumber = (input) => {
        const regex = /^(.+) (\d+)$/;
        const match = input.match(regex);
        if (match) {
          const name = match[1];
          const number = match[2];
          return { name, number };
        } else {
          return { name: null, number: null };
        }
      };

      const { name, number } = separateNameAndNumber(input);

      setValue(`invoice.${index}.price`, number.toString());
      setValue(`invoice.${index}.product`, name.toString());
    }

    const quantity = getValues(`invoice.${index}.price`);
    const price = e.target.value;
    const number = quantity * price;
    const value = number.toString();

    setValue(`invoice.${index}.subtotalPrice`, value);

    setSubtotal((prevState) => {
      return { ...prevState, [`invoice.${index}.subtotalPrice`]: value };
    });

    const sumValuesByKey = (array, key) => {
      let total = 0;
      for (const obj of array) {
        if (obj.hasOwnProperty(key)) {
          const value = parseInt(obj[key], 10);
          if (!isNaN(value)) {
            total += value;
          }
        }
      }
      return total;
    };

    const invoice = getValues("invoice");
    const sum = sumValuesByKey(invoice, "subtotalPrice");
    setValue("total", sum.toString());
    setTotal(sum);
  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Factura adaugata",
      description: "Ati adaugat factura cu succes!",
      duration: 5000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <Box height={"100%"}>
      <Heading size="sm" color="primary.600">
        Adauga o noua factura
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
                label="Nume client"
                name="clientName"
                register={register}
                error={errors["clientName"]}
                helperText="Introdu numele clientului."
                elementProps={{ marginBottom: "24px" }}
              />
              <TextInput
                label="CIF/CNP"
                name="cifCnp"
                register={register}
                error={errors["cifCnp"]}
                helperText="Introdu CIF-ul sau CNP-ul clientului."
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
              label="Numar de telefon"
              name="phoneNumber"
              register={register}
              error={errors["phoneNumber"]}
              helperText="Introdu numarul de telefon al clientului."
              elementProps={{ marginBottom: "24px" }}
            />
          </Flex>

          <Flex
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
            width="100%"
          >
            <TextInput
              label="Judet"
              name="county"
              register={register}
              error={errors["county"]}
              helperText="Introdu judetul clientului."
              elementProps={{ marginBottom: "24px" }}
            />
            <TextInput
              label="Oras"
              name="city"
              register={register}
              error={errors["city"]}
              helperText="Introdu orasul clientului."
              elementProps={{ marginBottom: "24px" }}
            />
          </Flex>
          <Flex
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
            width="100%"
          >
            <TextInput
              label="Detalii extra"
              name="addressDetails"
              register={register}
              error={errors["addressDetails"]}
              helperText="Introdu detaliile adresei clientului cum ar fi strada, numar, bloc, apartament etc."
              elementProps={{ marginBottom: "24px" }}
            />
          </Flex>
          <Box>
            <Text>Selecteaza data emiterii facturii:</Text>
            <br />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              required
              customInput={<CustomInput />}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                console.log(startDate);
              }}
            />
          </Box>
          <Flex
            gap={5}
            width="100%"
            marginTop={"20px"}
            flexDirection={"column"}
          >
            <Box>
              {fields.map((item, index) => (
                <Box key={item.id} marginBottom={"8px"}>
                  <Box>
                    <Text marginBottom={"4px"}>Produs</Text>
                    <Controller
                      control={control}
                      name={`invoice.${index}.product`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          placeholder={"Selecteaza un produs"}
                          marginBottom={"24px"}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        >
                          {stocks &&
                            stocks.map((stock) => {
                              return (
                                <option
                                  key={stock.id}
                                  value={`${stock.stock.productName} ${stock.stock.price}`}
                                >
                                  {`Produs: ${stock.stock.productName} / Unitate: ${stock.stock.unit} / Pret: ${stock.stock.price} lei`}
                                </option>
                              );
                            })}
                        </Select>
                      )}
                    />
                    <QuantityInput
                      name={`invoice.${index}.quantity`}
                      register={register}
                      label="Cantitate"
                      error={errors["quantity"]}
                      helperText={
                        "Pret subtotal: " +
                        subtotal[`invoice.${index}.subtotalPrice`]
                      }
                      elementProps={{ marginBottom: "24px" }}
                      onChange={(e) => handleQuantityOnchange(e, index)}
                    />
                  </Box>
                  <Button
                    colorScheme="red"
                    type="Button"
                    onClick={() => remove(index)}
                  >
                    Sterge
                  </Button>
                </Box>
              ))}
            </Box>
            <Button
              type="Button"
              onClick={() => append({ product: "", quantity: "" })}
            >
              Adauga alt produs
            </Button>
          </Flex>
          <Flex mt="24px" justifyContent="space-between">
            <Text fontWeight={"bold"} fontSize={"large"}>
              Total: {total} lei
            </Text>
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
