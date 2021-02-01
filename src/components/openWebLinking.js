import React, { useCallback } from 'react';
import { Linking, Alert, TouchableOpacity } from 'react-native';
export const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
  };
