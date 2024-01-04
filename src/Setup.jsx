import React from "react";
import { Box, Heading, Text, Flex, Progress } from "@chakra-ui/react";
import CompanySetup from "./components/setup/CompanySetup";
import AdministratorSetup from "./components/setup/AdministratorSetup";
import CompletedSetup from "./components/setup/CompletedSetup";
export default function Setup() {
  const [data, setData] = React.useState({});
  const [step, setStep] = React.useState(1);
  const onCompanySubmit = (values) => {
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
    setData({ ...data, company: companyData });
    setStep(2);
  };

  const onAdminSubmit = (values) => {
    const adminData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      confirmPassword: values.confirmPassword.trim(),
    };
    setData({ ...data, admin: adminData });
    setStep(3);
  };

  const returnToStep = (step) => {
    if (step > 0 && step < 4) {
      setStep(step);
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
        w="800px"
        border="1px solid lightgrey"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
      >
        <Box>
          <Progress
            value={step === 1 ? 0 : step === 2 ? 50 : 100}
            zIndex="1"
            colorScheme={step === 3 ? "green" : "primary"}
            size="lg"
          />
        </Box>
        <Box padding="16px">
          {step !== 3 && (
            <Box>
              <Heading size="md">Configurarea Inițială a Companiei</Heading>
              <Text fontSize="md" color="gray">
                Bine ai venit în procesul de configurare! Vom avea nevoie de
                câteva detalii despre compania ta și despre administrator pentru
                a începe.
              </Text>
            </Box>
          )}

          {step === 1 && (
            <CompanySetup data={data} onCompanySubmit={onCompanySubmit} />
          )}
          {step === 2 && (
            <AdministratorSetup
              data={data}
              onAdminSubmit={onAdminSubmit}
              returnToStep={returnToStep}
            />
          )}
          {step === 3 && <CompletedSetup />}
        </Box>
      </Box>
    </Flex>
  );
}
