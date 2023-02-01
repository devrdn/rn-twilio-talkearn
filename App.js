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
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
