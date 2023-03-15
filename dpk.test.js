const crypto = require('crypto');
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  // it("Returns the literal '0' when given no input", () => {
  //   const trivialKey = deterministicPartitionKey();
  //   expect(trivialKey).toBe("0");
  // });

  // test('returns trivial partition key when event is falsy', () => {
  //   const result = deterministicPartitionKey(null);
  //   expect(result).toBe("0");
  // });

  // test('returns partition key from event if it exists', () => {
  //   const event = {
  //     partitionKey: "my-custom-partition-key"
  //   };
  //   const result = deterministicPartitionKey(event);
  //   expect(result).toBe("my-custom-partition-key");
  // });

  // test('hashes event using sha3-512 when partition key is missing', () => {
  //   const event = {
  //     someData: "to-be-hashed"
  //   };
  //   const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  //   const result = deterministicPartitionKey(event);
  //   expect(result).toBe(hash);
  // });

  test('hashes candidate again when it exceeds max length', () => {
    const longKey = "a".repeat(300);
    const hash = crypto.createHash("sha3-512").update(longKey).digest("hex");
    const result = deterministicPartitionKey({ someData: longKey });
    expect(result).toBe(hash);
  });

  // test('converts non-string candidate to string', () => {
  //   const event = {
  //     partitionKey: 1234
  //   };
  //   const result = deterministicPartitionKey(event);
  //   expect(typeof result).toBe("string");
  // });
});
