/**
 * @format
 */

import { AppRegistry, AppState } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

// utils
import socket from './src/utils/socket';

// import store
import { store } from './src/store/store';

// import component
import App from './App';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Application />;
}

const Application = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
