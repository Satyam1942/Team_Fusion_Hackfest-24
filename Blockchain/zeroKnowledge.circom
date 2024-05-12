include "../circuits/utils/circomlib/pedersenhasher.circom";

component main = PasswordVerifier;

template PasswordVerifier() {
    // Constants
    const HASH_SIZE = 253; // Adjust based on your hash size
    const FIELD_SIZE = 254; // Field size for Pedersen hash
    const NUM_BITS = 8; // Number of bits for each character in password

    // Signals
    signal input id[NUM_BITS], password[NUM_BITS], expectedHash[HASH_SIZE];
    signal private hashInput[HASH_SIZE], hashKey[FIELD_SIZE], hashOutput[FIELD_SIZE];
    signal private isValid;

    // Convert password characters to bits
    signal private passwordBits[NUM_BITS * NUM_BITS];
    for (var i = 0; i < NUM_BITS; i++) {
        for (var j = 0; j < NUM_BITS; j++) {
            passwordBits[i * NUM_BITS + j] = password[i][j];
        }
    }

    // Concatenate id and password bits
    signal private idPasswordBits[NUM_BITS + NUM_BITS * NUM_BITS];
    for (var i = 0; i < NUM_BITS; i++) {
        idPasswordBits[i] = id[i];
    }
    for (var i = 0; i < NUM_BITS * NUM_BITS; i++) {
        idPasswordBits[NUM_BITS + i] = passwordBits[i];
    }

    // Pad idPasswordBits to match FIELD_SIZE
    signal private paddedIdPasswordBits[FIELD_SIZE];
    for (var i = 0; i < NUM_BITS + NUM_BITS * NUM_BITS; i++) {
        paddedIdPasswordBits[i] = idPasswordBits[i];
    }
    for (var i = NUM_BITS + NUM_BITS * NUM_BITS; i < FIELD_SIZE; i++) {
        paddedIdPasswordBits[i] = 0;
    }

    // Hash the paddedIdPasswordBits
    hashKey[0] = 123; // Some arbitrary key for hashing
    hashInput = paddedIdPasswordBits;
    hashOutput = PedersenHasher([hashInput], hashKey);

    // Compare the hashed password with the expected hash
    isValid = 1;
    for (var i = 0; i < HASH_SIZE; i++) {
        if (hashOutput[i] != expectedHash[i]) {
            isValid = 0;
            break;
        }
    }

    // Output the result
    signal output isValid;
}
