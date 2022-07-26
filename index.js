import * as qubic from 'qubic-js';

// Define one ore multiple seeds here
var seeds = [
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
];

// Message you want to sign
var message = "For ComputorPollBot from YourDiscordUserName#1234";

// String you want to prepend to the JSON output
var outputPrefix = "/register ";

// String you want to append after the JSON output
var outputSuffix = "\r\n";


///////////// Nothing for casual users to change after this line  ///////////////////////////////////

const encoder = new TextEncoder("utf-8");
const SHIFTED_HEX_CHARS = "abcdefghijklmnop";
const bytesToShiftedHex = function(bytes) {
    let hex = "";
    for (let i2 = 0; i2 < bytes.length; i2++) {
        hex += SHIFTED_HEX_CHARS[bytes[i2] >> 4] + SHIFTED_HEX_CHARS[bytes[i2] & 15];
    }
    return hex;
};

// Load crypto instance
qubic.crypto.then((cryptoInstance) => {

    // Loop over all seeds
    for (const seed of seeds) {
        // Load identity from seed and proceed
        qubic.createIdentity(seed, 0).then((identity) => {
            // Create Private Key for signing
            var privateKey = qubic.privateKey(seed,0, cryptoInstance.K12);

            // Create Public Key
            var publicKey = cryptoInstance.schnorrq.generatePublicKey(privateKey);

            // Encode Message
            var encodedText = encoder.encode(message);

            // Create Signed Message
            var signedMessage = cryptoInstance.schnorrq.sign(privateKey, publicKey, encodedText);

            // Calculate checksum;
            const checksum = new Uint8Array(1);
            cryptoInstance.K12(signedMessage, checksum, 1, 0);
            const checksumChar = bytesToShiftedHex(checksum);

            // Create JSON Message
            var output = JSON.stringify({
                identity,
                message: message,
                signature: bytesToShiftedHex(signedMessage) + checksumChar
            });

            // manipulate output as desired
            var contentToWrite = outputPrefix + output + outputSuffix;

            // Show output
            console.log(contentToWrite);
        });
    }
});
