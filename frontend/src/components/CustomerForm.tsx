import { useState } from "react";
import {
  Button,
  Input,
  useToast,
  Card,
  CardBody,
  Heading,
  Stack,
} from "@chakra-ui/react";

type CustomerFormProps = {
  title: string;
  buttonLabel: string;
  buttonColor: string;
  action: (id: string) => Promise<any>;
  type: "add" | "get" | "delete";
};

export function CustomerForm({
  title,
  buttonLabel,
  buttonColor,
  action,
  type,
}: CustomerFormProps) {
  const [id, setId] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!id.trim()) {
      toast({
        title: "Validation Error",
        description: "ID cannot be empty",
        status: "warning",
      });
      return;
    }

    if (!/^\d+$/.test(id)) {
      toast({
        title: "Validation Error",
        description: "ID must contain only digits",
        status: "error",
      });
      return;
    }

    try {
      const res = await action(id);

      if (res.error) {
        toast({ title: "Error", description: res.error, status: "warning" });
      } else {
        let description = "";

        if (type === "add") {
          description = `ID: ${res.id}, created: ${res.createdAt}`;
        } else if (type === "get") {
          description = `Found ID: ${res.id}, created: ${res.createdAt}`;
        } else if (type === "delete") {
          description = "Customer deleted successfully";
        }

        toast({
          title: `${title} Success`,
          description,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }

      setId("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred";
      toast({
        title: "Error",
        description: message,
        status: "error",
      });
    }
  };

  return (
    <Card shadow="md" borderRadius="lg">
      <CardBody>
        <Stack spacing={4}>
          <Heading size="md" textAlign="left">
            {title}
          </Heading>
          <Input
            type="number"
            placeholder="Customer ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button colorScheme={buttonColor} onClick={handleSubmit} width="full">
            {buttonLabel}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
