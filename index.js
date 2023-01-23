/**
 * @format
 */

import { AppRegistry, AppState } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import socket from './src/utils/socket';

AppRegistry.registerComponent(appName, () => App);