import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';

// As Expo's SecureStore does not support values larger than 2048
// bytes, an AES-256 key is generated and stored in SecureStore, while
// it is used to encrypt/decrypt values stored in AsyncStorage.

//key maps to encryption key in secure store, key maps to encrypted value in async storage

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8)); //generate encryption key

    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1)); //get a cipher
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value)); //encrypt value with generated key

    await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey)); //store encryption key in SecureStore

    return aesjs.utils.hex.fromBytes(encryptedBytes); //return encrypted value
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key); //get encryption key
    if (!encryptionKeyHex) {
      return encryptionKeyHex;
    }

    const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1)); //generate cipher based on encryption key
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value)); //decrypt value with encryption key

    return aesjs.utils.utf8.fromBytes(decryptedBytes); //return decrypted value
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) { return encrypted; }

    return await this._decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY;

if(!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or api Key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});