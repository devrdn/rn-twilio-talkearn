import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import VideoCallScreen from '../screens/VideoCallScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';
import React from 'react';

import socket from '../utils/socket';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectLoginData);

  React.useEffect(() => {
    if (isAuth) {
      const recepientId = `expert-${user.expert.id}`;

      socket.on(`connect`, () => {
        console.log(`Connect ${socket.id}`);
      });

      socket.on(`inComingCall-${recepientId}`, () => {
        console.log(`inComingCall ${socket.id}`);
      });

      socket.on(`startCall-${recepientId}`, () => {
        console.log(`startCall ${socket.id}`);
      });

      socket.on(`declineCall-${recepientId}`, () => {
        console.log(`declineCall ${socket.id}`);
      });
    }
  }, [isAuth]);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
