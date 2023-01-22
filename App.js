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
} from 'react-native';

// components
import { Navigation } from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
