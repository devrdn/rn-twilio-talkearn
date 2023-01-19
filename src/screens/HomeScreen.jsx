import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';

const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Twilio Video Call',
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <View style={styles.content}>
          <Pressable
            onPress={() => navigation.navigate('VideoCall')}
            style={styles.btn}>
            <Text style={styles.btnText}>Video Call</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;
