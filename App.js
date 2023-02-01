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

const App = () => {
  // todo: make as separate component
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [senderId, setSenderId] = React.useState('');

  // todo: temporary in this component

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CallModal />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
