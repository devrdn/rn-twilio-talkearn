import React from 'react';
import { Button, Text, StyleSheet, TextInput, View, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

// import images
import loginImage from '../assets/images/loginImage.jpg';
import authApi from '../api/authApi';

const LoginScreen = () => {
  // init form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    const user = await authApi.login(data, err => console.log('Hello', err));
    console.log(user);
  };

  return (
    <View styles={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/loginImage.jpg')}
        />
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
