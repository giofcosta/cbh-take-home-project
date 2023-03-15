const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//       console.log('passsou 1')
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//       console.log('passsou 3')
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//     console.log('passsou 4')
//   }
//   console.log('max_pa_key', candidate.length)
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     console.log('passsou 2')
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = event.partitionKey || crypto.createHash("sha3-512")
    .update(JSON.stringify(event))
    .digest("hex");

  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512")
      .update(candidate)
      .digest("hex");
  }

  return candidate;
};

// explanations for the changes:

// Instead of using a separate variable candidate that gets reassigned multiple times, we declare it using const and assign it once using a ternary expression.
// We move the if (!event) check to the beginning of the function to make it clear that this is the "early return" case.
// We chain the crypto.createHash() calls to make the code more concise and readable.
// We remove the if (candidate) check since it's unnecessary.
// We simplify the last if statement by using return instead of reassigning candidate.