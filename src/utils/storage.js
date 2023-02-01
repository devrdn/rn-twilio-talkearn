import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Set Item to storage
 * @param {String} key Item Key
 * @param {Any} item Item
 * @param {Function()} cbErr Callback on Error
 */
export const setItem = async (key, item, cbErr) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    cbErr(error);
  }
};

/**
 * Get item from storage
 * @param {String} key Item Key
 * @param {Function} cbErr Callback on Error
 */
export const getItem = async (key, cbErr) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    cbErr(err);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
