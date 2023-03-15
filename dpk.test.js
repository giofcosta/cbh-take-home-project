const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe('deterministicPartitionKey', () => {
  const event = {
    key1: 'value1',
    key2: 'value2'
  };

  it('should return a trivial partition key if no event is passed in', () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it('should return a partition key based on the event if no partitionKey is present', () => {
    const event = {
      key1: 'value1',
      key2: 'value2'
    };
    const hash = crypto.createHash('sha3-512');
    const expectedKey = hash.update(JSON.stringify(event)).digest('hex');
  
    expect(deterministicPartitionKey(event)).toBe(expectedKey);
  });

  it('should return the provided partition key if present', () => {
    const providedKey = "my-partition-key";
    const eventWithKey = {
      ...event,
      partitionKey: providedKey
    };

    expect(deterministicPartitionKey(eventWithKey)).toBe(providedKey);
  });

  it('should return a hashed partition key if the key is too long', () => {
    const longKey = "a".repeat(300);
    const expectedKey = crypto.createHash("sha3-512")
      .update(longKey)
      .digest("hex");

    const eventWithLongKey = {
      ...event,
      partitionKey: longKey
    };

    expect(deterministicPartitionKey(eventWithLongKey)).toBe(expectedKey);
  });

  it('should return a JSON stringified partition key if the candidate is not a string', () => {
    const nonStringKey = 123;
    const expectedKey = JSON.stringify(nonStringKey);

    const eventWithNonStringKey = {
      ...event,
      partitionKey: nonStringKey
    };

    expect(deterministicPartitionKey(eventWithNonStringKey)).toBe(expectedKey);
  });
});
