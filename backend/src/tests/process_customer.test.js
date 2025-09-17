import { jest } from "@jest/globals";

const mockSend = jest.fn();
jest.unstable_mockModule("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: { from: () => ({ send: mockSend }) },
  PutCommand: jest.fn(),
}));

const { handler } = await import("../lambdas/process_customer/app.mjs");

describe("process_customer", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env.TABLE_NAME = "test-table";
  });

  it("fails if no customerId", async () => {
    const res = await handler({});
    expect(res.status).toBe("FAILED");
    expect(res.error).toBe("Invalid customerId");
    expect(mockSend).not.toHaveBeenCalled();
  });
});