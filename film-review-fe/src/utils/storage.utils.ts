import * as Crypto from "crypto-js";

export class StorageUtils {
  static key = import.meta.env.APP_KEY_ENCRYPTION;

  static encrypt(value: string) {
    return Crypto.AES.encrypt(value, this.key).toString();
  }

  static decrypt(txtToDecrypt: string) {
    return Crypto.AES.decrypt(txtToDecrypt, this.key).toString(Crypto.enc.Utf8);
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
