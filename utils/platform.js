import { Platform } from 'react-native';

// Platform-spesifiset helperit
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Platform-spesifiset tyylit
export const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
  headerPadding: Platform.select({
    ios: 60,
    android: 50,
  }),
};

export default {
  isIOS,
  isAndroid,
  platformStyles,
};

