import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';

const fontSFProTextRegular = 'SFProText-Regular';


const FavouritesTieKnotsScreen = ({ setSelectedTieKnotsScreen, savedKnots, setSavedKnots }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isKnotVisible, setIsKnotVisible] = useState(false);
  const [selectedKnot, setSelectedKnot] = useState(null);
  const [currentFavTieKnotIndex, setCurrentFavTieKnotIndex] = useState(0);
  const scrollFavTieKnotsX = useRef(new Animated.Value(0)).current;
  const slidesFavTieKnotsRef = useRef(null);

  const handleDeleteFavKnot = async (id) => {
    try {
      const updatedFavKnots = savedKnots.filter(kn => kn.id !== id);
      setSavedKnots(updatedFavKnots);
      setIsKnotVisible(false);
      await AsyncStorage.setItem('savedKnots', JSON.stringify(updatedFavKnots));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <SafeAreaView style={{
      paddingHorizontal: dimensions.width * 0.05,
      flex: 1,
      width: dimensions.width,
    }}>
      <View style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginBottom: dimensions.height * 0.025,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.width,
        paddingHorizontal: dimensions.width * 0.05,
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
              if (!isKnotVisible) {
                setSelectedTieKnotsScreen('Home');
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
              fontWeight: 700,
              color: 'white',
              textAlign: 'left',
              fontSize: dimensions.width * 0.059,
              fontFamily: fontSFProTextRegular,
            }}>
            Favourites
          </Text>
        </View>
        <TouchableOpacity style={{
          zIndex: 100,
          opacity: isKnotVisible ? 1 : 0,
        }}
          disabled={!selectedKnot}
          onPress={() => handleDeleteFavKnot(selectedKnot.id)}
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
              alignSelf: 'center',
              height: dimensions.height * 0.25,
              shadowColor: '#000',
              borderRadius: dimensions.width * 0.043,
              backgroundColor: '#02338A',
              justifyContent: 'center',
              width: dimensions.width * 0.9,
              alignItems: 'center',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 5,
              elevation: 3,
              shadowOpacity: 0.28,
              marginTop: dimensions.height * 0.23,
            }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: dimensions.width * 0.07,
                  textAlign: 'center',
                  fontFamily: fontSFProTextRegular,
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
                  width: dimensions.width * 0.9,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: dimensions.height * 0.014,
                  justifyContent: 'space-between',
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
                        maxWidth: dimensions.width * 0.77,
                        fontFamily: fontSFProTextRegular,
                        textAlign: 'left',
                        fontSize: dimensions.width * 0.037,
                        fontWeight: 400,
                        color: '#999999',
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
                    onPress={() => handleDeleteFavKnot(savedKnot.id)}
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
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollFavTieKnotsX } } }], {
                useNativeDriver: false,
              })}
              scrollEventThrottle={32}
              ref={slidesFavTieKnotsRef}
            >
              {selectedKnot.stepImages.map((item, index) => {
                if (index < selectedKnot.stepImages.length) {
                  return (
                    <View key={item.id} style={{ width: dimensions.width * 0.9, flex: 1, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} >
                      <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: dimensions.height * 0.03,
                        alignSelf: 'center',
                        width: dimensions.width * 0.9,
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
            justifyContent: 'space-between',
            alignSelf: 'center',
            marginTop: dimensions.height * 0.014,
            alignItems: 'center',
            width: dimensions.width * 0.9,
            paddingVertical: dimensions.height * 0.016,
            flexDirection: 'row',
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
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
            }}>
              <TouchableOpacity onPress={() => {
                if (currentFavTieKnotIndex > 0) {
                  const newIndex = currentFavTieKnotIndex - 1;
                  slidesFavTieKnotsRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                  setCurrentFavTieKnotIndex(newIndex);
                }
              }}
                disabled={currentFavTieKnotIndex === 0}
              >
                <Image
                  source={require('../assets/icons/chevronLeftIcon.png')}
                  style={{
                    opacity: currentFavTieKnotIndex > 0 ? 1 : 0.5,
                    height: dimensions.height * 0.03,
                    width: dimensions.height * 0.03,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <View style={{
                backgroundColor: '#F1B900',
                height: dimensions.height * 0.037,
                marginHorizontal: dimensions.width * 0.05,
                borderRadius: dimensions.height * 0.05,
                width: dimensions.height * 0.037,
              }}>
              </View>

              <TouchableOpacity onPress={() => {
                if (currentFavTieKnotIndex < selectedKnot.stepImages.length - 1) {
                  const newIndex = currentFavTieKnotIndex + 1;
                  slidesFavTieKnotsRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                  setCurrentFavTieKnotIndex(newIndex);
                }
              }}
                disabled={currentFavTieKnotIndex === selectedKnot.stepImages.length - 1}
              >
                <Image
                  source={require('../assets/icons/chevronRightIcon.png')}
                  style={{
                    width: dimensions.height * 0.03,
                    height: dimensions.height * 0.03,
                    opacity: currentFavTieKnotIndex < selectedKnot.stepImages.length - 1 ? 1 : 0.5,
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
              marginTop: dimensions.height * 0.01,
              color: 'white',
              paddingHorizontal: dimensions.width * 0.05,
              fontSize: dimensions.width * 0.05,
              textAlign: 'left',
              fontFamily: fontSFProTextRegular,
              fontWeight: 700,
            }}>
            {selectedKnot?.title}
          </Text>
          <Text
            style={{
              marginTop: dimensions.height * 0.019,
              color: '#999999',
              fontSize: dimensions.width * 0.04,
              fontWeight: 500,
              fontFamily: fontSFProTextRegular,
              width: dimensions.width * 0.9,
              paddingHorizontal: dimensions.width * 0.05,
              textAlign: 'left',
            }}
          >
            {selectedKnot.description}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default FavouritesTieKnotsScreen;
