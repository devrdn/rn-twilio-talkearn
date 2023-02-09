import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

// import images
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';
import LoginForm from '../components/AuthForm/LoginForm';
import callApi from '../api/callApi';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = () => {
  const loginData = useSelector(selectLoginData);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (isAuth) {
      patchDeviceToken();
    }
  }, [loginData]);

  const patchDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    callApi.patchDeviceToken(token, loginData.expert.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/loginImage.jpg')}
        />
        {loginData.expert.name && (
          <Text>Loggined as {loginData.expert.name}</Text>
        )}
      </View>
      <View style={styles.form}>
        <LoginForm errors={loginData.errors} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginHorizontal: 42,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 20,
    margin: 20,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
