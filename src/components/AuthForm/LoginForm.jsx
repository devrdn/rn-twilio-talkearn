import React from 'react';
import { useDispatch } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import theme from '../../theme';

// form validation
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../../utils/form-schemas/login.schema';

// redux async actions
import { fetchLogin } from '../../store/auth/asyncActions';
import { useNavigation } from '@react-navigation/core';

const LoginForm = ({ errors }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });
  
  React.useEffect(() => {
    if(form.formState.isSubmitted && errors.length === 0) {
      form.reset();
      navigation.navigate('Home');
    }
  }, [errors]);

  // submit login form
  const onSubmit = data => {
    dispatch(fetchLogin(data));
  };

  return (
    <View style={styles.form}>
      <View style={styles.fieldGroup}>
        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textField}
              placeholder="Email"
            />
          )}
          name="email"
        />
        <Text style={styles.error}>{form.formState.errors.email?.message}</Text>
      </View>
      <View style={styles.fieldGroup}>
        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textField}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        <Text style={styles.error}>
          {form.formState.errors.password?.message}
        </Text>
      </View>
      <View>
        {errors &&
          errors.map((err, i) => (
            <Text key={i} style={styles.error}>
              * {err}
            </Text>
          ))}
      </View>
      <TouchableOpacity
        onPress={form.handleSubmit(onSubmit)}
        disabled={!form.formState.isValid}
        style={
          form.formState.isValid ? styles.submitBtn : styles.submitBtnDisabled
        }>
        <Text style={styles.submitBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.color.secondary,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  submitBtn: {
    backgroundColor: theme.color.primary,
    width: '30%',
    borderRadius: 15,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  submitBtnDisabled: {
    backgroundColor: theme.color.primaryDisabled,
    width: '30%',
    borderRadius: 15,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  submitBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  error: {
    marginBottom: 10,
    color: 'red',
  },
});

export default LoginForm;
