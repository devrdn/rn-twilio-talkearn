import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import VideoCallScreen from '../screens/VideoCallScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppState, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';
import React from 'react';

import socket from '../utils/socket';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{ title: 'Video Call' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
