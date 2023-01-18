import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import VideoCallScreen from './VideoCallScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen
          name="VideoCall"
          component={VideoCallScreen}
          options={{ title: 'Video Call' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
