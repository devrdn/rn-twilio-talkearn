import 'react-native-gesture-handler';

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native';


// components
import { Navigation } from './src/navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';

// import selectors
import { selectIsAuth, selectLoginData } from './src/store/auth/selectors';
import socket from './src/utils/socket';
import api from './src/api/axios';
import { useNavigation } from '@react-navigation/native';
import CallModal from './src/components/CallModal';
import { setRecipientId } from './src/store/call/slice';
import { getCallData } from './src/store/call/selectors';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  React.useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CallModal />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
