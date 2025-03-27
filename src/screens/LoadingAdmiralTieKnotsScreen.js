import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingAdmiralTieKnotsScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [admiralPercentage, setAdmiralPercentage] = useState(0);

  useEffect(() => {
    if (admiralPercentage < 100) {
      const timer = setTimeout(() => {
        setAdmiralPercentage(admiralPercentage + 1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      navigation.replace('Home');
    }
  }, [admiralPercentage]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ImageBackground
        source={require('../assets/images/tieKnotsSplashImage.png')}
        style={{
          position: 'absolute',
          width: dimensions.width,
          height: dimensions.height,
          alignSelf: 'center',
        }}
        resizeMode='stretch'
      />

      <View style={{
        position: 'absolute',
        bottom: dimensions.height * 0.07,
        width: dimensions.width * 0.9,
        height: dimensions.height * 0.0043,
        backgroundColor: '#484848',
        borderRadius: dimensions.width * 0.01,
        overflow: 'hidden',
      }}>
        <View style={{
          width: dimensions.width * 0.88 * (admiralPercentage / 100),
          height: dimensions.height * 0.0043,
          backgroundColor: '#F1B900',
          borderRadius: dimensions.width * 0.01,
        }}>
        </View>
      </View>
    </View>
  );
};

export default LoadingAdmiralTieKnotsScreen;