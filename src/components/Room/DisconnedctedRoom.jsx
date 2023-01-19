import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import styles from '../../styles';

const DisconnedctedRoom = ({ getToken, onConnect }) => {
  return (
    <View>
      <Text style={styles.welcome}>React Native Twilio Video</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={token => getToken(token)}
      />
      <Button title="Connect" style={styles.button} onPress={onConnect} />
    </View>
  );
};

export default DisconnedctedRoom;
