import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const fontSFProTextRegular = 'SFProText-Regular';


const FavouritesScreen = ({ setSelectedAdmiralScreen, savedKnots, setSavedKnots }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isKnotVisible, setIsKnotVisible] = useState(false);
  const [selectedKnot, setSelectedKnot] = useState(null);


  const isKnotSaved = (thisKnot) => {
    return savedKnots.some((kn) => kn.id === thisKnot.id);
  };

  const handleDeleteKnot = async (id) => {
    try {
      const updatedFavKnots = savedKnots.filter(kn => kn.id !== id);
      setSavedKnots(updatedFavKnots);
      await AsyncStorage.setItem('savedKnots', JSON.stringify(updatedFavKnots));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
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
              if (!isKnotVisible) {
                setSelectedAdmiralScreen('Home');
              } else setIsKnotVisible(false);
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
            Favourites
          </Text>
        </View>
        <TouchableOpacity style={{
          zIndex: 100,
          opacity: isKnotVisible ? 1 : 0,
        }}
          disabled={!selectedKnot}
          onPress={() => handleDeleteKnot(selectedKnot.id)}
        >
          <Image
            source={require('../assets/icons/goldHeartIcon.png')}
            style={{
              width: dimensions.height * 0.034,
              height: dimensions.height * 0.034,
            }}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      {!isKnotVisible ? (
        <ScrollView style={{
          width: dimensions.width,
          alignSelf: 'center',
        }} contentContainerStyle={{
          paddingBottom: dimensions.height * 0.16,
        }}>
          {savedKnots.length === 0 ? (
            <View style={{
              width: dimensions.width * 0.9,
              height: dimensions.height * 0.25,
              alignSelf: 'center',
              borderRadius: dimensions.width * 0.043,
              backgroundColor: '#02338A',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.28,
              shadowRadius: 5,
              elevation: 3,
              marginTop: dimensions.height * 0.23,
            }}>
              <Text
                style={{
                  fontFamily: fontSFProTextRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.07,
                  textAlign: 'center',
                  alignSelf: 'center',

                  fontWeight: 700,
                }}>
                No saved knots yet
              </Text>

            </View>
          ) : (
            savedKnots.map((savedKnot, index) => (
              <TouchableOpacity
                key={savedKnot.id}
                onPress={() => {
                  setSelectedKnot(savedKnot);
                  setIsKnotVisible(true);
                }}
                style={{
                  width: dimensions.width * 0.9,
                  alignSelf: 'center',
                  marginBottom: dimensions.height * 0.034,
                }}>
                <Image
                  source={savedKnot.previewImage}
                  style={{
                    width: dimensions.width * 0.9,
                    height: dimensions.height * 0.25,
                    borderRadius: dimensions.width * 0.043,
                  }}
                />
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: dimensions.height * 0.014,
                  width: dimensions.width * 0.9,
                }}>
                  <View style={{
                    width: dimensions.width * 0.77,
                  }}>
                    <Text
                      style={{
                        fontFamily: fontSFProTextRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.055,
                        textAlign: 'left',
                        fontWeight: 700,
                      }}>
                      {savedKnot.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontSFProTextRegular,
                        color: '#999999',
                        fontSize: dimensions.width * 0.037,
                        textAlign: 'left',
                        fontWeight: 400,
                        maxWidth: dimensions.width * 0.77,
                      }}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {savedKnot.description}
                    </Text>
                  </View>

                  <TouchableOpacity style={{
                    zIndex: 100,
                  }}
                    onPress={() => handleDeleteKnot(savedKnot.id)}
                  >
                    <Image
                      source={require('../assets/icons/goldHeartIcon.png')}
                      style={{
                        width: dimensions.height * 0.028,
                        height: dimensions.height * 0.028,
                      }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      ) : (
        <ScrollView style={{
          width: dimensions.width,
          alignSelf: 'center',
        }} contentContainerStyle={{
          paddingBottom: dimensions.height * 0.16,
        }}>
          <View style={{
            display: 'flex',
            alignSelf: 'center',
            width: dimensions.width * 0.9,
          }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: false,
              })}
              scrollEventThrottle={32}
              ref={slidesRef}
            >
              {selectedKnot.stepImages.map((item, index) => {
                if (index < selectedKnot.stepImages.length) {
                  return (
                    <View key={item.id} style={{ width: dimensions.width * 0.9, flex: 1, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} >
                      <View style={{
                        flexDirection: 'row',
                        width: dimensions.width * 0.9,
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: dimensions.height * 0.03,
                      }}>
                        <Image
                          source={selectedKnot.stepImages[index].image}
                          style={{
                            width: dimensions.width * 0.9,
                            alignSelf: 'center',
                            height: dimensions.height * 0.25,
                            borderRadius: dimensions.width * 0.043,
                          }}
                          resizeMode='stretch'
                        />
                      </View>
                    </View>
                  );
                }
                return null;
              })}
            </ScrollView>
          </View>

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.014,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: dimensions.height * 0.016,
          }}>
            <Image
              source={require('../assets/icons/knotLeftIcon.png')}
              style={{
                width: dimensions.height * 0.037,
                height: dimensions.height * 0.037,
              }}
              resizeMode='contain'
            />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              flex: 1,
            }}>
              <TouchableOpacity onPress={() => {
                if (currentIndex > 0) {
                  const newIndex = currentIndex - 1;
                  slidesRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                  setCurrentIndex(newIndex);
                }
              }}
                disabled={currentIndex === 0}
              >
                <Image
                  source={require('../assets/icons/chevronLeftIcon.png')}
                  style={{
                    width: dimensions.height * 0.03,
                    height: dimensions.height * 0.03,
                    opacity: currentIndex > 0 ? 1 : 0.5,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <View style={{
                width: dimensions.height * 0.037,
                height: dimensions.height * 0.037,
                borderRadius: dimensions.height * 0.05,
                backgroundColor: '#F1B900',
                marginHorizontal: dimensions.width * 0.05,
              }}>
              </View>

              <TouchableOpacity onPress={() => {
                if (currentIndex < selectedKnot.stepImages.length - 1) {
                  const newIndex = currentIndex + 1;
                  slidesRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                  setCurrentIndex(newIndex);
                }
              }}
                disabled={currentIndex === selectedKnot.stepImages.length - 1}
              >
                <Image
                  source={require('../assets/icons/chevronRightIcon.png')}
                  style={{
                    width: dimensions.height * 0.03,
                    height: dimensions.height * 0.03,
                    opacity: currentIndex < selectedKnot.stepImages.length - 1 ? 1 : 0.5,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/icons/knotRightIcon.png')}
              style={{
                width: dimensions.height * 0.037,
                height: dimensions.height * 0.037,
              }}
              resizeMode='contain'
            />

          </View>

          <Text
            style={{
              fontFamily: fontSFProTextRegular,
              color: 'white',
              fontSize: dimensions.width * 0.05,
              textAlign: 'left',
              fontWeight: 700,
              paddingHorizontal: dimensions.width * 0.05,
              marginTop: dimensions.height * 0.01,
            }}>
            {selectedKnot?.title}
          </Text>
          <Text
            style={{
              fontFamily: fontSFProTextRegular,
              color: '#999999',
              fontSize: dimensions.width * 0.04,
              textAlign: 'left',
              fontWeight: 500,
              width: dimensions.width * 0.9,
              paddingHorizontal: dimensions.width * 0.05,
              marginTop: dimensions.height * 0.019,
            }}
          >
            {selectedKnot.description}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;
