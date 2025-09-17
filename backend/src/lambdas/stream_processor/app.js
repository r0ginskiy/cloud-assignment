const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");

const stepfunctions = new SFNClient();

exports.handler = async (event) => {
  console.log("DynamoDB Stream event:", JSON.stringify(event, null, 2));
  console.log("State Machine ARN:", process.env.CUSTOMER_STATE_MACHINE_ARN);

  for (const record of event.Records) {
    if (record.eventName === "INSERT") {
      const customerId = record.dynamodb.NewImage.id.S;

      const command = new StartExecutionCommand({
        stateMachineArn: process.env.CUSTOMER_STATE_MACHINE_ARN,
        input: JSON.stringify({ customerId }),
      });

      try {
        await stepfunctions.send(command);
        console.log("✅ Started Step Function for customer:", customerId);
      } catch (err) {
        console.error("❌ Failed to start Step Function:", err);
      }
    }
  }

  return { status: "done" };
};
