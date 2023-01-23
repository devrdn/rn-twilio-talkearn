import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  AppRegistry,
} from 'react-native';

import 'react-native-gesture-handler';
import notifee, { EventType } from '@notifee/react-native';

// components
import { Navigation } from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
const App = () => {
  React.useEffect(() => {
    // Request permissions for notifications (IOS required)
    const requestPemissions = async () => {
      await notifee.requestPermission();
    };
    requestPemissions();
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          console.log('User Pressed notification');
          break;
        case EventType.DISMISSED:
          console.log("User don't pressed notification");
          break;
        case EventType.UNKNOWN:
          console.log('Unknown type');
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
