import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
  console.log("Event:", event);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.id) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "id is required" }),
      };
    }

    const createdAt = new Date().toISOString();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: { S: body.id },
        createdAt: { S: createdAt },
      },
    };

    await client.send(new PutItemCommand(params));

    return {
      statusCode: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ id: body.id, createdAt }),
    };
  } catch (err) {
    console.error("Error in put_customer_id:", err);

    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
