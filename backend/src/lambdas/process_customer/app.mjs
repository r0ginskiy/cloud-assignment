import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME =
  process.env.PROCESSED_CUSTOMERS_TABLE || "processed_customers";

export const handler = async (event) => {
  console.log("Processing customer:", JSON.stringify(event, null, 2));

  try {
    const { customerId } = event;

    if (!customerId || typeof customerId !== "string") {
      throw new Error("Invalid customerId");
    }

    const item = {
      id: customerId,
      createdAt: new Date().toISOString(),
      status: "PROCESSED",
    };

    await dynamodb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    console.log(`✅ Customer ${customerId} processed and stored.`);

    return {
      status: "SUCCESS",
      customer: item,
    };
  } catch (err) {
    console.error("❌ Error in ProcessCustomer:", err);
    return {
      status: "FAILED",
      error: err.message,
    };
  }
};
