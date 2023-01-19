import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export const metrix = {
  screenWidth: screenWidth < screenHeight ? screenWidth : screenHeight,
  screenHeight: screenWidth < screenHeight ? screenHeight : screenWidth,
  windowHeight: windowWidth < windowHeight ? windowWidth : windowHeight,
  windowWidth: windowWidth < windowHeight ? windowHeight : windowWidth,
};
