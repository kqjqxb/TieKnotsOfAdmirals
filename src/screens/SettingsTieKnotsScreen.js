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

const tieKnotsLinkButtons = [
  {
    id: 1,
    tieKnotsButtonTitle: 'Privacy Policy',
    tieKnotsButtonLink: 'https://www.termsfeed.com/live/a79df892-98ee-4c61-893c-9422702a8f5a',
    tieKnotsIcon: require('../assets/icons/admiralPrivacyIcon.png'),
  },
  {
    id: 2,
    tieKnotsButtonTitle: 'Terms of Use',
    tieKnotsButtonLink: 'https://www.termsfeed.com/live/5d50a43c-14db-4c91-9321-fb1e07881648',
    tieKnotsIcon: require('../assets/icons/admiralTermsIcon.png'),
  }
]

const SettingsTieKnotsScreen = ({ setSelectedTieKnotsScreen, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <View style={{
      alignSelf: 'center',
      height: dimensions.height,
      alignItems: 'center',
      width: dimensions.width,
      flex: 1,
    }}>
      <SafeAreaView style={{
        paddingHorizontal: dimensions.width * 0.0493,
        flex: 1,
        width: dimensions.width,
      }}>
        <View style={{
          paddingHorizontal: dimensions.width * 0.05,
          alignSelf: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          width: dimensions.width,
          justifyContent: 'space-between',
          marginBottom: dimensions.height * 0.025,
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <TouchableOpacity style={{
              marginRight: dimensions.width * 0.043,
            }}
              onPress={() => {
                setSelectedTieKnotsScreen('Home');
              }}
            >
              <Image
                source={require('../assets/icons/admiralBackIcon.png')}
                style={{
                  height: dimensions.height * 0.05,
                  width: dimensions.height * 0.05,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 700,
                color: 'white',
                fontSize: dimensions.width * 0.059,
                fontFamily: fontSFProTextRegular,
                textAlign: 'left',
              }}>
              Settings
            </Text>
          </View>
        </View>

        <View style={{ marginTop: dimensions.height * 0.01 }}></View>

        {tieKnotsLinkButtons.map((button) => (
          <TouchableOpacity
            key={button.id}
            onPress={() => {
              Linking.openURL(button.tieKnotsButtonLink);
            }}
            style={{
              flexDirection: 'row',
              height: dimensions.height * 0.0691,
              backgroundColor: 'white',
              alignItems: 'center',
              paddingHorizontal: dimensions.width * 0.0493,
              alignSelf: 'center',
              marginTop: button.id !== 1 ? dimensions.height * 0.023 : 0,
              justifyContent: 'space-between',
              borderRadius: dimensions.width * 0.039,
              width: dimensions.width * 0.892,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 600,
                color: 'black',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                fontFamily: fontSFProDisplayRegular,
              }}>
              {button.tieKnotsButtonTitle}
            </Text>

            <Image
              source={button.tieKnotsIcon}
              style={{
                height: dimensions.height * 0.031,
                width: dimensions.height * 0.031,
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        ))}

      </SafeAreaView>
      <Image
        source={require('../assets/images/settingsAdmiralImage.png')}
        style={{
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 0 },
          position: 'absolute',
          bottom: -dimensions.height * 0.1,
          height: dimensions.height * 0.55,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          left: dimensions.width * 0.111,
          width: dimensions.width * 0.43,
          elevation: 5,
        }}
        resizeMode='contain'
      />
    </View>
  );
};

export default SettingsTieKnotsScreen;
