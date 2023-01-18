import React, {Component, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  AppRegistry,
  TextInput,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';

import {PERMISSIONS} from 'react-native-permissions';

import styleSheet from '../styles';
import {
  _requestAndroidAudioPermission,
  _requestAndroidCameraPermission,
  _requestIOSAudioPermissions,
  _requestIOSCameraPermissions,
} from '../utils/getPermissions';

const styles = StyleSheet.create(styleSheet);

const __ROOM_NAME = 'test-room';

const VideoCall = () => {
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const [status, setStatus] = React.useState('disconnected');
  const [participants, setParticipants] = React.useState(new Map());
  const [participantCount, setParticipantCount] = React.useState([]);
  const [videoTracks, setVideoTracks] = React.useState(new Map());
  const [token, setToken] = React.useState('');
  const [isSharing, setIsSharing] = React.useState(false);
  const twilioVideo = React.useRef(null);

  React.useEffect(() => {
    return () => {
      setIsAudioEnabled(true);
      setIsVideoEnabled(false);
      twilioVideo.current?.disconnect();
    };
  }, []);

  const _onConnectButtonPress = async () => {
    
    // request permissions on Android or IOS
    if (Platform.OS === 'android') {
      await _requestAndroidCameraPermission();
      await _requestAndroidAudioPermission();
    } else if (Platform.OS === 'ios') {
      await _requestIOSAudioPermissions();
      await _requestIOSCameraPermissions();
    }

    try {
      await twilioVideo.current.connect({
        accessToken: token,
        enableNetworkQualityReporting: true,
        dominantSpeakerEnabled: true,
      });
    } catch (err) {
      console.log(err);
    }
    setStatus('connecting');
  };

  const setTwilioRef = ref => {
    twilioVideo.current = ref;
  };

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onVideoButtonPress = () => {
    twilioVideo.current
      .setLocalVideoEnabled(!isVideoEnabled)
      .then(setIsVideoEnabled(isEnabled => !isEnabled));
  };

  const _onShareButtonPressed = () => {
    twilioVideo.current.toggleScreenSharing(!isSharing);
    setIsSharing(!isSharing);
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = room => {
    console.log(room);
    console.log(new Map(room.participants).size);
    setStatus('connected');
  };

  const _getStats = stats => {
    console.log(stats);
  };

  const _onRoomDidDisconnect = error => {
    console.log('ERROR: ', error);
    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);
    setVideoTracks(newVideoTracks);
  };

  const _onNetworkLevelChanged = ({participant, isLocalUser, quality}) => {
    console.log(
      'Participant',
      participant,
      'isLocalUser',
      isLocalUser,
      'quality',
      quality,
    );
  };

  const _onDominantSpeakerDidChange = ({roomName, roomSid, participant}) => {
    console.log(
      'onDominantSpeakerDidChange',
      `roomName: ${roomName}`,
      `roomSid: ${roomSid}`,
      'participant:',
      participant,
    );
  };

  const _onRoomParticipantDidConnect = (room, part) => {
    console.log(room);
  };

  const getParticipantSize = () => {
    return participants.size;
  };

  return (
    <View style={styles.container}>
      {status === 'disconnected' && (
        <View>
          <Text style={styles.welcome}>React Native Twilio Video</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={token}
            onChangeText={text => setToken(text)}></TextInput>
          <Button
            title="Connect"
            style={styles.button}
            onPress={_onConnectButtonPress}></Button>
        </View>
      )}

      {(status === 'connected' || status === 'connecting') && (
        <View>
          {status === 'connected' && (
            <View style={{flex: 1}}>
              <View>
                {Array.from(videoTracks, ([trackSid, trackId]) => (
                  <TwilioVideoParticipantView
                    style={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackId}
                  />
                ))}
              </View>
              <View style={styles.optionsContainer}>
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={_onFlipButtonPress}
                    style={styles.optionButton}>
                    <Text style={styles.buttonText}>Flip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_onMuteButtonPress}
                    style={styles.optionButton}>
                    <Text style={styles.buttonText}>
                      {isAudioEnabled ? 'Mute' : 'UnMute'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_onVideoButtonPress}
                    style={styles.optionButton}>
                    <Text style={styles.buttonText}>
                      {isVideoEnabled ? 'Video OFF' : 'Video ON'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_onEndButtonPress}
                    style={styles.optionButtonEnd}>
                    <Text style={styles.buttonText}>End</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TwilioVideoLocalView
                enabled={true}
                applyZOrder={true}
                style={styles.localVideo}
              />
            </View>
          )}
        </View>
      )}
      

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onRoomParticipantDidConnect={_onRoomParticipantDidConnect}
        //onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
      />
    </View>
  );
};

export default VideoCall;
