import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import callApi from '../api/callApi';
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';
import { getCallData } from '../store/call/selectors';
import {
  clearCallData,
  clearSenderId,
  setError,
  setRecipientId,
  setRoomSid,
  setSenderId,
  setToken,
} from '../store/call/slice';
import socket from '../utils/socket';

import messaging from '@react-native-firebase/messaging';

import globalStyles from '../styles';

const CallModal = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { recipientId, senderId, isCall } = useSelector(getCallData);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectLoginData);
  const nav = useNavigation();

  React.useEffect(() => {
    if (isAuth) {
      dispatch(setRecipientId(`expert-${user.expert.id}`));
      // handle call
      if (isCall) {
        handleInComingCall();
      }
      handleStartCall();
      handleDeclineCall();
    }
  });

  const handleInComingCall = () => {
    socket.on(`inComingCall-${recipientId}`, data => {
      const callData = JSON.parse(data);
      setIsModalVisible(true);
      dispatch(setSenderId(callData.senderId));
    });
  };

  const handleStartCall = () => {
    socket.on(`startCall-${recipientId}`, async identity => {
      const callInfo = JSON.parse(identity);
      try {
        const { data } = await callApi.getCallToken(callInfo.senderId);
        setIsModalVisible(false);
        dispatch(setRoomSid(callInfo.room));
        dispatch(setToken(data.token));
        nav.navigate('VideoCall');
      } catch (error) {
        dispatch(setError(error));
      }
    });
  };

  const handleDeclineCall = () => {
    socket.on(`declineCall-${recipientId}`, () => {
      setIsModalVisible(false);
      dispatch(clearSenderId);
    });
  };

  const declineCall = () => {
    socket.emit(
      'declineCall',
      JSON.stringify({
        senderId,
        recipientId,
      }),
    );
    setIsModalVisible(false);
    dispatch(clearCallData);
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
    <ReactNativeModal isVisible={isModalVisible} swipeDirection="left">
      <View style={styles.modal}>
        <Text>You have a call from {senderId}</Text>
        <View>
          <TouchableOpacity style={styles.optionButton} onPress={startCall}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={declineCall}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
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
  ...globalStyles,
});

export default CallModal;
