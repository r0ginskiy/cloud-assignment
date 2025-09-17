import { jest } from "@jest/globals";

const mockSend = jest.fn();
jest.unstable_mockModule("@aws-sdk/client-sfn", () => ({
  SFNClient: jest.fn(() => ({ send: mockSend })),
  StartExecutionCommand: jest.fn(),
}));

const { handler } = await import("../lambdas/stream_processor/app.js");

describe("stream_processor", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env.CUSTOMER_STATE_MACHINE_ARN = "arn:aws:states:us-east-1:123456789012:stateMachine:test";
  });

  it("ignores non-INSERT", async () => {
    const res = await handler({ Records: [{ eventName: "REMOVE" }] });
    expect(mockSend).not.toHaveBeenCalled();
    expect(res.status).toBe("done");
  });
});