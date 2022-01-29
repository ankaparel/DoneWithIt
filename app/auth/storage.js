import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = 'authToken';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYW5rYXBhcmVsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9.2mPfanfj_CGk1JUcVeFgUn5YpXxXduaXTOGJn7NMgeg'


const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  // try {
  //   return await SecureStore.getItemAsync(key);
  // } catch (error) {
  //   console.log("Error getting the auth token", error);
  // }
  return userToken
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
