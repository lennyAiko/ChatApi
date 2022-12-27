import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const {SECRET_KEY, SALT, ALGORITHM} = process.env

const algorithm = ALGORITHM;
const salt = SALT;
const hash = crypto.createHash("sha1");
const secretkey = SECRET_KEY

hash.update(salt);

// `hash.digest()` returns a Buffer by default when no encoding is given
let key = hash.digest().slice(0, 16);
crypto.createHash('sha256').update(String(secretkey)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

export const encrypt = (text) => {
  
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString('hex') };
}

export const decrypt = (text) => {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}
