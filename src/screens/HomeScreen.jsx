import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSetStatus } from '../store/auth/asyncActions';
import { selectLoginData, selectStatus } from '../store/auth/selectors';

const HomeScreen = ({ navigation }) => {
  const expertStatus = useSelector(selectStatus);
  const loginData = useSelector(selectLoginData);

  const dispatch = useDispatch();
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Twilio Video Call',
    });
  });

  const setExpertStatus = () => {
    dispatch(fetchSetStatus(loginData.expert?.id));
  }
  return (
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
        {expertStatus && (
          <Pressable
            onPress={setExpertStatus}
            style={styles.btn}>
            <Text style={styles.btnText}>Your is {}</Text>
          </Pressable>
        )}
      </View>
    </View>
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
