/* Plugins. */
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Functionality to set the in the applications local. */
export const setAsyncStorageData = ({ key, value }) => {
    if (value) AsyncStorage.setItem(key, value)
};

/* Functionality to get cookies. */
export const getAsyncStorageData = (key) => AsyncStorage.getItem(key);

/* Functionality to remove cookies. */
export const removeAsyncStorageData = (key) => {
    AsyncStorage.removeItem(key)
};