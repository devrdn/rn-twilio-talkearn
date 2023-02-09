import React from 'react';
import { View, Text } from 'react-native';

//import { sign } from 'react-native-pure-jwt';
import VideoCall from '../components/VideoCall';

const __ROOM_NAME = 'test-room';

const VideoCallScreen = () => {
  return (
    <View>
      <VideoCall />
    </View>
  );
};

export default VideoCallScreen;
