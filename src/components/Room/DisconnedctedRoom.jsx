import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import styles from '../../styles';

const DisconnedctedRoom = ({ getToken, onConnect }) => {
  return (
    <View>
      <Text style={styles.welcome}>Connecting to User ...</Text>
    </View>
  );
};

export default DisconnedctedRoom;
