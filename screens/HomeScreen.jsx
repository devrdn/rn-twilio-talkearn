import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

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
          <Pressable onPress={() => navigation.navigate('VideoCall')} style={styles.btn}>
            <Text style={styles.btnText}>Video Call</Text>
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
