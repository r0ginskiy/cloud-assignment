import { jest } from "@jest/globals";

const mockSend = jest.fn();

jest.unstable_mockModule("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: { from: jest.fn(() => ({ send: mockSend })) },
  GetCommand: function FakeGetCommand() {},
}));

const { handler } = await import("../lambdas/get_customer_id/index.mjs");

describe("get_customer_id", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env.TABLE_NAME = "test-table";
  });

  it("returns 400 if id missing", async () => {
    const res = await handler({ httpMethod: "GET", pathParameters: {} });
    expect(res.statusCode).toBe(400);
  });

  it("returns 404 if customer not found", async () => {
    mockSend.mockResolvedValue({});
    const res = await handler({ httpMethod: "GET", pathParameters: { id: "x" } });
    expect(res.statusCode).toBe(404);
  });

  it("returns 200 with item", async () => {
    mockSend.mockResolvedValue({ Item: { id: "123" } });
    const res = await handler({ httpMethod: "GET", pathParameters: { id: "123" } });
    expect(mockSend).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});
