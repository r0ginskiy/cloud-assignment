import { Box, Heading, Stack } from "@chakra-ui/react";
import { CustomerForm } from "./components/CustomerForm";
import { addCustomer, getCustomer, deleteCustomer } from "./api/client";

function App() {
  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Box maxW="lg" mx="auto" p={6} textAlign="center">
        <Heading mb={10} size="xl">
          Cloud Assignment
        </Heading>

        <Stack spacing={6}>
          <CustomerForm
            title="Add Customer"
            buttonLabel="Add"
            buttonColor="teal"
            action={addCustomer}
            type="add"
          />
          <CustomerForm
            title="Get Customer"
            buttonLabel="Get"
            buttonColor="blue"
            action={getCustomer}
            type="get"
          />
          <CustomerForm
            title="Delete Customer"
            buttonLabel="Delete"
            buttonColor="red"
            action={deleteCustomer}
            type="delete"
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;
