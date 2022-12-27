import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const secretKey = crypto.randomBytes(32)
const iv = 'crypto.randomBytes(16)'

export const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (iv, content) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

