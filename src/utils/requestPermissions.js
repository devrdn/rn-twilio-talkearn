import { PermissionsAndroid } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";


export const _requestIOSCameraPermissions = async () => {
  return await request(PERMISSIONS.IOS.CAMERA);
};

export const _requestIOSAudioPermissions = async () => {
  return await request(PERMISSIONS.IOS.MICROPHONE);
}

export const _requestAndroidCameraPermission = () => {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Need permission to access camera',
    message: 'To run this demo we need permission to access your camera',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });
};

export const _requestAndroidAudioPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: 'Need permission to access microphone',
      message:
        'To run this demo we need permission to access your microphone',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
};
