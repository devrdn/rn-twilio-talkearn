import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';

// import request permissions
import {
  _requestAndroidAudioPermission,
  _requestAndroidCameraPermission,
  _requestIOSAudioPermissions,
  _requestIOSCameraPermissions,
} from '../utils/requestPermissions';

// import styles
import styleSheet from '../styles';

// import components
import DisconnedctedRoom from './Room/DisconnedctedRoom';

const styles = StyleSheet.create(styleSheet);

const __ROOM_NAME = 'test-room';

const VideoCall = () => {
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
  // const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const [status, setStatus] = React.useState('disconnected');
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

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = room => {
    console.log(room);
    setStatus('connected');
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

  const _onRoomParticipantDidConnect = (room, part) => {
    console.log(room);
  };

  return (
    <View style={styles.container}>
      {status === 'disconnected' && (
        <DisconnedctedRoom
          getToken={token => setToken(token)}
          onConnect={_onConnectButtonPress}
        />
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
      />
    </View>
  );
};

export default VideoCall;
