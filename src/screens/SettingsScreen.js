import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';
const fontSFProTextRegular = 'SFProText-Regular';

const admiralTieKnotsLinkButtons = [
  {
    id: 1,
    admiralTieKnotsButtonTitle: 'Privacy Policy',
    admiralTieKnotsButtonLink: '',
    admiralTieKnotsIcon: require('../assets/icons/admiralPrivacyIcon.png'),
  },
  {
    id: 2,
    admiralTieKnotsButtonTitle: 'Terms of Use',
    admiralTieKnotsButtonLink: '',
    admiralTieKnotsIcon: require('../assets/icons/admiralTermsIcon.png'),
  }
]

const SettingsScreen = ({ setSelectedAdmiralScreen, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      width: dimensions.width,
      height: dimensions.height,
      alignSelf: 'center',
    }}>

      <SafeAreaView style={{
        flex: 1,
        paddingHorizontal: dimensions.width * 0.05,
        width: dimensions.width,
      }}>
        <View style={{
          width: dimensions.width,
          alignSelf: 'flex-start',
          marginBottom: dimensions.height * 0.025,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: dimensions.width * 0.05,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{
              marginRight: dimensions.width * 0.043,
            }}
              onPress={() => {
                setSelectedAdmiralScreen('Home');
              }}
            >
              <Image
                source={require('../assets/icons/admiralBackIcon.png')}
                style={{
                  width: dimensions.height * 0.05,
                  height: dimensions.height * 0.05,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: fontSFProTextRegular,
                color: 'white',
                fontSize: dimensions.width * 0.059,
                textAlign: 'left',
                fontWeight: 700,
              }}>
              Settings
            </Text>
          </View>
        </View>

        <View style={{ marginTop: dimensions.height * 0.01 }}></View>

        {admiralTieKnotsLinkButtons.map((button) => (
          <TouchableOpacity
            key={button.id}
            onPress={() => {
              Linking.openURL(button.admiralTieKnotsButtonLink);
            }}
            style={{
              width: dimensions.width * 0.9,
              height: dimensions.height * 0.07,
              backgroundColor: 'white',
              borderRadius: dimensions.width * 0.039,
              paddingHorizontal: dimensions.width * 0.05,
              alignSelf: 'center',
              marginTop: button.id !== 1 ? dimensions.height * 0.023 : 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'black',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 600,
              }}>
              {button.admiralTieKnotsButtonTitle}
            </Text>

            <Image
              source={button.admiralTieKnotsIcon}
              style={{
                width: dimensions.height * 0.031,
                height: dimensions.height * 0.031,
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        ))}

      </SafeAreaView>
      <Image
        source={require('../assets/images/settingsAdmiralImage.png')}
        style={{
          width: dimensions.width * 0.43,
          height: dimensions.height * 0.55,
          position: 'absolute',
          bottom: -dimensions.height * 0.1,
          left: dimensions.width * 0.111,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        }}
        resizeMode='contain'
      />
    </View>
  );
};

export default SettingsScreen;
