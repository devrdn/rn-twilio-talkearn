import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToggleAvailable } from '../store/auth/asyncActions';
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userData = useSelector(selectLoginData);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Twilio Video Call',
    });
  });

  const toggleExpertStatus = () => {
    dispatch(fetchToggleAvailable(userData.expert.id));
  };

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
        {isAuth && (
          <View>
            <Text>
              You are now {userData.expert.available ? 'Online' : 'Offline'}
            </Text>
            <Pressable onPress={toggleExpertStatus} style={styles.btn}>
              <Text style={styles.btnText}>Changle available status</Text>
            </Pressable>
          </View>
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
