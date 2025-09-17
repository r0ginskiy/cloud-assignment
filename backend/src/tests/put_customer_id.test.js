import { jest } from "@jest/globals";

const mockDdbSend = jest.fn();
const mockSnsSend = jest.fn();

jest.unstable_mockModule("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(() => ({ send: mockDdbSend })),
  PutItemCommand: function FakePutItemCommand() {}, 
}));

jest.unstable_mockModule("@aws-sdk/client-sns", () => ({
  SNSClient: jest.fn(() => ({ send: mockSnsSend })),
  PublishCommand: function FakePublishCommand() {}, 
}));

const { handler } = await import("../lambdas/put_customer_id/index.mjs");

describe("put_customer_id", () => {
  beforeEach(() => {
    mockDdbSend.mockReset();
    mockSnsSend.mockReset();
    process.env.TABLE_NAME = "test-table";
    process.env.SNS_TOPIC_ARN = "arn:aws:sns:test";
  });

  it("returns 400 if id missing", async () => {
    const res = await handler({ httpMethod: "POST", body: "{}" });
    expect(res.statusCode).toBe(400);
  });

  it("writes to DynamoDB and publishes SNS", async () => {
    mockDdbSend.mockResolvedValue({});
    mockSnsSend.mockResolvedValue({});
    const res = await handler({ httpMethod: "POST", body: JSON.stringify({ id: "abc" }) });
    expect(mockDdbSend).toHaveBeenCalled();
    expect(mockSnsSend).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
  });
});
