import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';

const LoadingAdmiralTieKnotsScreen = () => {
  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
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
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
      <ImageBackground
        source={require('../assets/images/tieKnotsSplashImage.png')}
        style={{
          width: dimensions.width,
          position: 'absolute',
          alignSelf: 'center',
          height: dimensions.height,
        }}
        resizeMode='stretch'
      />

      <View style={{
        bottom: dimensions.height * 0.07,
        overflow: 'hidden',
        borderRadius: dimensions.width * 0.01,
        position: 'absolute',
        width: dimensions.width * 0.9,
        backgroundColor: '#484848',
        height: dimensions.height * 0.0043,
      }}>
        <View style={{
          height: dimensions.height * 0.0043,
          borderRadius: dimensions.width * 0.01,
          backgroundColor: '#F1B900',
          width: dimensions.width * 0.88 * (admiralPercentage / 100),
        }}>
        </View>
      </View>
    </View>
  );
};

export default LoadingAdmiralTieKnotsScreen;