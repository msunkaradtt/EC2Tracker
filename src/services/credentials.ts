// src/services/credentials.ts
import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'aws_access_key_id';
const SECRET_KEY = 'aws_secret_access_key';

export const saveCredentials = async (accessKey: string, secretKey: string) => {
  await SecureStore.setItemAsync(ACCESS_KEY, accessKey);
  await SecureStore.setItemAsync(SECRET_KEY, secretKey);
};

export const getCredentials = async () => {
  const accessKeyId = await SecureStore.getItemAsync(ACCESS_KEY);
  const secretAccessKey = await SecureStore.getItemAsync(SECRET_KEY);
  if (accessKeyId && secretAccessKey) {
    return { accessKeyId, secretAccessKey };
  }
  return null;
};

// --- NEW FUNCTION ---
export const deleteCredentials = async () => {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(SECRET_KEY);
};