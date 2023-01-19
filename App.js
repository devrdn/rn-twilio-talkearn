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
import {Navigation} from './src/navigation/Navigation';

const App = () => {
  return <Navigation />;
};

export default App;
