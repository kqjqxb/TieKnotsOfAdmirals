import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './SettingsScreen';

import climbingData from '../components/climbingData';
import boatingData from '../components/boatingData';
import fishingData from '../components/fishingData';
import FavouritesScreen from './FavouritesScreen';
import TieKnotsGamesScreen from './TieKnotsGamesScreen';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';
const fontSProTextRegular = 'SFProText-Regular';

const bottomBtns = [
  {
    id: 1,
    screen: 'AdmiralGames',
    admiralBtnIcon: require('../assets/icons/admiralUpIcons/admiralGameIcon.png'),
  },
  {
    id: 3,
    screen: 'Favourites',
    admiralBtnIcon: require('../assets/icons/admiralUpIcons/admiralFavoriteIcon.png'),
  },
  {
    id: 4,
    screen: 'Settings',
    admiralBtnIcon: require('../assets/icons/admiralUpIcons/admiralSettingsIcon.png'),
  },
]

const activities = [
  {
    id: 1,
    title: 'Climbing',
    image: require('../assets/images/activities/climbing.png'),
  },
  {
    id: 2,
    title: 'Boating',
    image: require('../assets/images/activities/boating.png'),
  },
  {
    id: 3,
    title: 'Fishing',
    image: require('../assets/images/activities/fishing.png'),
  },

]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedAdmiralScreen, setSelectedAdmiralScreen] = useState('Home');

  const [coinCollection, setCoinCollection] = useState([]);
  const [selectedActivityCategory, setSelectedActivityCategory] = useState(null);
  const [selectedKnot, setSelectedKnot] = useState(null);
  const [isActivityVisible, setIsActivityVisible] = useState(false);
  const [isCoinGameStarted, setIsCoinGameStarted] = useState(false);
  const [isKnotVisible, setIsKnotVisible] = useState(false);
  const [savedKnots, setSavedKnots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const loadCoinCollection = async () => {
    try {
      const storedCollection = await AsyncStorage.getItem('coinCollection');
      const parsedCollection = storedCollection ? JSON.parse(storedCollection) : [];
      setCoinCollection(parsedCollection);
    } catch (error) {
      console.error('Error loading coinCollection:', error);
    }
  };

  useEffect(() => {
    loadCoinCollection();
  }, []);

  const getKnotsDataByCategory = (activityCtgr) => {
    switch (activityCtgr) {
      case 'Climbing':
        return climbingData;
      case 'Boating':
        return boatingData;
      case 'Fishing':
        return fishingData;
      default:
        return [];
    }
  };

  const knotsData = getKnotsDataByCategory(selectedActivityCategory);

  useEffect(() => {
    console.log('selectedKnot:', selectedKnot);
  }, [selectedKnot]);

  useEffect(() => {
    console.log('knotsData:', knotsData);
  }, [knotsData]);

  useEffect(() => {
    const fetchSavedKnots = async () => {
      try {
        const savedKnot = await AsyncStorage.getItem('savedKnots');
        setSavedKnots(savedKnot ? JSON.parse(savedKnot) : []);
      } catch (error) {
        console.error('error downloading knots:', error);
      }
    };

    fetchSavedKnots();
  }, [selectedActivityCategory]);


  const isKnotSaved = (thisKnot) => {
    return savedKnots.some((kn) => kn.id === thisKnot?.id);
  };

  const saveKnot = async (knot) => {
    try {
      const savedKn = await AsyncStorage.getItem('savedKnots');
      const parsedKnots = savedKn ? JSON.parse(savedKn) : [];

      const thisKnotIndex = parsedKnots.findIndex((loc) => loc.id === knot.id);

      if (thisKnotIndex === -1) {
        const updatedKnots = [knot, ...parsedKnots];
        await AsyncStorage.setItem('savedKnots', JSON.stringify(updatedKnots));
        setSavedKnots(updatedKnots);
        console.log('knot was saved');
      } else {
        const updatedKnots = parsedKnots.filter((loc) => loc.id !== knot.id);
        await AsyncStorage.setItem('savedKnots', JSON.stringify(updatedKnots));
        setSavedKnots(updatedKnots);
        console.log('knot was deleted');
      }
    } catch (error) {
      console.error('error of save/delete knot:', error);
    }
  };

  return (
    <View style={{
      backgroundColor: '#01173e',
      flex: 1,
      height: dimensions.height,
      width: dimensions.width,
    }}>
      {selectedAdmiralScreen === 'Home' ? (
        !isActivityVisible ? (
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
              justifyContent: 'space-between',
              paddingHorizontal: dimensions.width * 0.05,
            }}>
              <Text
                style={{
                  fontFamily: fontSProTextRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.055,
                  textAlign: 'left',
                  fontWeight: 700,
                }}>
                All knots
              </Text>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
              }}>
                {bottomBtns.map((button, index) => (
                  <TouchableOpacity
                    key={button.id}
                    onPress={() => setSelectedAdmiralScreen(button.screen)}
                    style={{
                      paddingHorizontal: dimensions.height * 0.014,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={button.admiralBtnIcon}
                      style={{
                        width: dimensions.height * 0.028,
                        height: dimensions.height * 0.028,
                        textAlign: 'center'
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <ScrollView stule={{
              width: dimensions.width,

              alignSelf: 'center',
            }} contentContainerStyle={{
              paddingBottom: dimensions.height * 0.16,
            }}>
              {activities.map((activity, index) => (
                <TouchableOpacity
                  key={activity.id}
                  onPress={() => {
                    setSelectedActivityCategory(activity.title);
                    setIsActivityVisible(true);
                  }}
                  style={{
                    width: dimensions.width * 0.9,
                    alignSelf: 'center',
                    marginBottom: dimensions.height * 0.034,
                  }}>
                  <Image
                    source={activity.image}
                    style={{
                      width: dimensions.width * 0.9,
                      height: dimensions.height * 0.25,
                      borderRadius: dimensions.width * 0.043,
                    }}
                  />
                </TouchableOpacity>
              ))}

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
              }}>
                <Text
                  style={{
                    fontFamily: fontSProTextRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.055,
                    textAlign: 'left',
                    fontWeight: 700,
                  }}>
                  Soon
                </Text>

              </View>

            </ScrollView>
          </SafeAreaView>
        ) : (
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
                    if (isKnotVisible) {
                      setIsKnotVisible(false);
                    } else {
                      setIsActivityVisible(false);
                    }
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
                    fontFamily: fontSProTextRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.059,
                    textAlign: 'left',
                    fontWeight: 700,
                  }}>
                  {selectedActivityCategory}
                </Text>
              </View>
              <TouchableOpacity style={{
                zIndex: 100,
                opacity: isKnotVisible ? 1 : 0,
              }}
                disabled={!selectedKnot}
                onPress={() => saveKnot(selectedKnot)}
              >
                <Image
                  source={isKnotSaved(selectedKnot)
                    ? require('../assets/icons/goldHeartIcon.png')
                    : require('../assets/icons/emptyHeartIcon.png')
                  }
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
                {knotsData.map((knot, index) => (
                  <TouchableOpacity
                    key={knot.id}
                    onPress={() => {
                      setSelectedKnot(knot);
                      setIsKnotVisible(true);
                    }}
                    style={{
                      width: dimensions.width * 0.9,
                      alignSelf: 'center',
                      marginBottom: dimensions.height * 0.034,
                    }}>
                    <Image
                      source={knot.previewImage}
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
                            fontFamily: fontSProTextRegular,
                            color: 'white',
                            fontSize: dimensions.width * 0.055,
                            textAlign: 'left',
                            fontWeight: 700,
                          }}>
                          {knot.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: fontSProTextRegular,
                            color: '#999999',
                            fontSize: dimensions.width * 0.037,
                            textAlign: 'left',
                            fontWeight: 400,
                            maxWidth: dimensions.width * 0.77,
                          }}
                          numberOfLines={1}
                          ellipsizeMode='tail'
                        >
                          {knot.description}
                        </Text>
                      </View>

                      <TouchableOpacity style={{
                        zIndex: 100,
                      }}
                        onPress={() => saveKnot(knot)}
                      >
                        <Image
                          source={isKnotSaved(knot)
                            ? require('../assets/icons/goldHeartIcon.png')
                            : require('../assets/icons/emptyHeartIcon.png')
                          }
                          style={{
                            width: dimensions.height * 0.028,
                            height: dimensions.height * 0.028,
                          }}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}

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
                }}>
                  <Text
                    style={{
                      fontFamily: fontSProTextRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.055,
                      textAlign: 'left',
                      fontWeight: 700,
                    }}>
                    Soon
                  </Text>
                </View>
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
                    fontFamily: fontSProTextRegular,
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
                    fontFamily: fontSProTextRegular,
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
        )

      ) : selectedAdmiralScreen === 'Settings' ? (
        <SettingsScreen setSelectedAdmiralScreen={setSelectedAdmiralScreen} selectedAdmiralScreen={selectedAdmiralScreen} />
      ) : selectedAdmiralScreen === 'Favourites' ? (
        <FavouritesScreen setSelectedAdmiralScreen={setSelectedAdmiralScreen} savedKnots={savedKnots} setSavedKnots={setSavedKnots} />
      ) : selectedAdmiralScreen === 'AdmiralGames' ? (
        <TieKnotsGamesScreen setSelectedAdmiralScreen={setSelectedAdmiralScreen} selectedAdmiralScreen={selectedAdmiralScreen} />
      ) : null}
    </View>
  );
};

export default HomeScreen;
