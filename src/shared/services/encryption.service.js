import CryptoJS from "crypto-js";


export class EncryptionService {
    constructor() { }

    //static key = process.env.ADMIN_SECRET; // 32 bytes

    static encrypt(text, key) {
        try {
            const encrypted = CryptoJS.AES.encrypt(text, key).toString();
            return encrypted;
        } catch(ex) {
            return null;
        }
    }

    static decrypt(encryptedText, key) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedText, key);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            return originalText;
        } catch(ex) {
            return null;
        }
    }
}




