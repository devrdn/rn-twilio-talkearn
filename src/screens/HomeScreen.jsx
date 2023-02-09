import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToggleAvailable } from '../store/auth/asyncActions';
import { selectIsAuth, selectLoginData } from '../store/auth/selectors';
import theme from '../theme';

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
        {isAuth ? (
          <View>
            <View>
              <Text style={styles.primaryText}>
                You are loggined as <Text style="">{userData.expert.name}</Text>{' '}
                [
                <Text
                  style={
                    userData.expert.available
                      ? styles.statusOnline
                      : styles.statufOffline
                  }>
                  {userData.expert.available ? 'Online' : 'Offline'}
                </Text>
                ]
              </Text>
            </View>
            <Pressable onPress={toggleExpertStatus} style={styles.btn}>
              <Text style={styles.btnText}>Changle available status</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
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
  primaryText: {
    fontSize: 15,
    marginBottom: 10,
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
  userName: {},
  statusOnline: {
    color: theme.color.primary,
  },
  statufOffline: {
    color: 'red',
  },
});

export default HomeScreen;
