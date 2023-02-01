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
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/store';

// import global stylesheet
import styleSheet from './src/styles';

// import selectors
import { selectIsAuth, selectLoginData } from './src/store/auth/selectors';
import socket from './src/utils/socket';
import ReactNativeModal from 'react-native-modal';
import api from './src/api/axios';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectLoginData);
  const nav = useNavigation();

  // todo: make as separate component
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [senderId, setSenderId] = React.useState('');
  const [recipientId, setRecipientId] = React.useState('');

  // todo: temporary in this component
  // after testring make a separate component
  React.useEffect(() => {
    //if (isAuth) {
    console.log('fsd', isAuth);
    setRecipientId(`expert-4`);

    socket.on(`connect`, () => {
      console.log(`Connect ${socket.id}`);
    });

    socket.on(`inComingCall-${recipientId}`, data => {
      console.log(`inComingCall ${socket.id}`);
      const callData = JSON.parse(data);
      setIsModalVisible(true);
      setModalText(`You have a call from ${callData.senderId}`);
      setSenderId(callData.senderId);
    });

    socket.on(`startCall-${recipientId}`, async identity => {
      const callInfo = JSON.parse(identity);
      try {
        const { data } = await api.get(
          `/calls/token?identity=${callInfo.senderId}`,
        );
        setIsModalVisible(false);
        console.log('Token', data.token);
        console.log('Call Info', callInfo);
        nav.navigate('VideoCall', {
          room: callInfo.room,
          token: data.token,
        });
      } catch (error) {
        console.log('ErrR' + error.response);
      }
    });

    socket.on(`declineCall-${recipientId}`, () => {
      console.log('Decline Call');
      setIsModalVisible(false);
      setSenderId('');
    });
    // }
  }, [isAuth]);

  const declineCall = () => {
    socket.emit(
      'declineCall',
      JSON.stringify({
        senderId,
        recipientId,
      }),
    );
    setIsModalVisible(false);
    setSenderId('');
  };

  const startCall = () => {
    socket.emit(
      'startCall',
      JSON.stringify({
        senderId,
        recipientId,
      }),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{recipientId}</Text>
      <ReactNativeModal isVisible={isModalVisible} swipeDirection="left">
        <View style={styles.modal}>
          <Text>{modalText}</Text>
          <Text>FDS</Text>
          <TouchableOpacity style={styles.optionButton} onPress={startCall}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={declineCall}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    marginHorizontal: 60,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ...styleSheet,
});

export default App;
