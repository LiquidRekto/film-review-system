import crypto from "crypto";

export class StorageUtils {
  static key = import.meta.env.APP_ENCRYPTION_KEY;

  static encrypt(txtToEncrypt: string) {
    const iv = crypto.randomBytes(import.meta.env.APP_KEY_IV_LENGTH);

    const cipher = crypto.createCipheriv(
      import.meta.env.APP_KEY_ALGORITHM,
      Buffer.from(import.meta.env.APP_KEY_ENCRYPTION),
      iv
    );

    let encrypted = cipher.update(txtToEncrypt, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Package the IV and encrypted data together
    return iv.toString("hex") + encrypted;
  }

  static decrypt(txtToDecrypt: string) {
    const inputIV = txtToDecrypt.slice(0, 32);
    const encrypted = txtToDecrypt.slice(32);

    const decipher = crypto.createDecipheriv(
      import.meta.env.APP_KEY_ALGORITHM,
      Buffer.from(import.meta.env.APP_KEY_ALGORITHM),
      Buffer.from(inputIV, "hex")
    );

    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  static getItem(key: string) {
    const data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}
