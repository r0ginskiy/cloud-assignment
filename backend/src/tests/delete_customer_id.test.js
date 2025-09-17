import { jest } from "@jest/globals";

const mockSend = jest.fn();

jest.unstable_mockModule("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(() => ({ send: mockSend })),
  DeleteItemCommand: function FakeDeleteItemCommand() {},
}));

const { handler } = await import("../lambdas/delete_customer_id/index.mjs");

describe("delete_customer_id", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env.TABLE_NAME = "test-table";
  });

  it("returns 400 if id missing", async () => {
    const res = await handler({ httpMethod: "DELETE", pathParameters: {} });
    expect(res.statusCode).toBe(400);
  });

  it("deletes item and returns 200", async () => {
    mockSend.mockResolvedValue({});
    const res = await handler({ httpMethod: "DELETE", pathParameters: { id: "123" } });
    expect(mockSend).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
