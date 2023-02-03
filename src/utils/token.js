import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
  } catch (error) {
    return null;
  }
};
