import * as forge from 'node-forge';

const publicKey = process.env.ENCRYPT_PUBLIC_KEY;

// Encrypts a message with the given public key
export const encryptedMessage = (message: string) => {
  if (!publicKey) {
    console.error('Public key is not defined');
    return message; // Return original message if no key is available
  }

  try {
    const publicRsaKey = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = publicRsaKey.encrypt(forge.util.encodeUtf8(message));
    const base64Encrypted = forge.util.encode64(encrypted);
    return base64Encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return message; // Return original message on error
  }
};