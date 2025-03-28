import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsTieKnotsScreen from './SettingsTieKnotsScreen';

import climbingData from '../components/climbingData';
import boatingData from '../components/boatingData';
import fishingData from '../components/fishingData';
import FavouritesTieKnotsScreen from './FavouritesTieKnotsScreen';
import TieKnotsGamesScreen from './TieKnotsGamesScreen';

const fontSProTextRegular = 'SFProText-Regular';

const bottomTieKnotsBtns = [
  {
    id: 1,
    tieKnotsScreen: 'AdmiralGames',
    tieKnotsBtnIcon: require('../assets/icons/tieKnotsUpIcons/admiralGameIcon.png'),
  },
  {
    id: 3,
    tieKnotsScreen: 'Favourites',
    tieKnotsBtnIcon: require('../assets/icons/tieKnotsUpIcons/admiralFavoriteIcon.png'),
  },
  {
    id: 4,
    tieKnotsScreen: 'Settings',
    tieKnotsBtnIcon: require('../assets/icons/tieKnotsUpIcons/admiralSettingsIcon.png'),
  },
]

const tieKnotsActivities = [
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

const HomeTieKnotsScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedTieKnotsScreen, setSelectedTieKnotsScreen] = useState('Home');

  const [selectedTieKnotsActivityCategory, setSelectedTieKnotsActivityCategory] = useState(null);
  const [selectedKnot, setSelectedKnot] = useState(null);
  const [isActivityVisible, setIsActivityVisible] = useState(false);
  const [isKnotVisible, setIsKnotVisible] = useState(false);
  const [savedKnots, setSavedKnots] = useState([]);
  const [currentTieKnotIndex, setCurrentTieKnotIndex] = useState(0);
  const scrollTieKnotsX = useRef(new Animated.Value(0)).current;
  const slidesTieKnotsRef = useRef(null);

  const getKnotsDataByCategory = (activityTieKnotCtgr) => {
    switch (activityTieKnotCtgr) {
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

  const knotsData = getKnotsDataByCategory(selectedTieKnotsActivityCategory);

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
  }, [selectedTieKnotsActivityCategory]);


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
      } else {
        const updatedKnots = parsedKnots.filter((loc) => loc.id !== knot.id);
        await AsyncStorage.setItem('savedKnots', JSON.stringify(updatedKnots));
        setSavedKnots(updatedKnots);
      }
    } catch (error) {
      console.error('error of save/delete knot:', error);
    }
  };

  return (
    <View style={{
      width: dimensions.width,
      flex: 1,
      height: dimensions.height,
      backgroundColor: '#01173e',
    }}>
      {selectedTieKnotsScreen === 'Home' ? (
        !isActivityVisible ? (
          <SafeAreaView style={{
            paddingHorizontal: dimensions.width * 0.05,
            flex: 1,
            width: dimensions.width,
          }}>
            <View style={{
              paddingHorizontal: dimensions.width * 0.05,
              alignSelf: 'flex-start',
              marginBottom: dimensions.height * 0.025,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: dimensions.width,
              paddingTop: dimensions.height * 0.01,
            }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: dimensions.width * 0.055,
                  fontFamily: fontSProTextRegular,
                }}>
                All knots
              </Text>

              <View style={{
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
                {bottomTieKnotsBtns.map((button, index) => (
                  <TouchableOpacity
                    key={button.id}
                    onPress={() => setSelectedTieKnotsScreen(button.tieKnotsScreen)}
                    style={{
                      paddingHorizontal: dimensions.height * 0.014,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={button.tieKnotsBtnIcon}
                      style={{
                        height: dimensions.height * 0.028,
                        textAlign: 'center',
                        width: dimensions.height * 0.028,
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
              {tieKnotsActivities.map((activity, index) => (
                <TouchableOpacity
                  key={activity.id}
                  onPress={() => {
                    setSelectedTieKnotsActivityCategory(activity.title);
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
                      height: dimensions.height * 0.25,
                      borderRadius: dimensions.width * 0.043,
                      width: dimensions.width * 0.9,
                    }}
                  />
                </TouchableOpacity>
              ))}

              <View style={{
                backgroundColor: '#02338A',
                height: dimensions.height * 0.25,
                alignSelf: 'center',
                elevation: 3,
                shadowColor: '#000',
                justifyContent: 'center',
                shadowOpacity: 0.28,
                alignItems: 'center',
                width: dimensions.width * 0.9,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                borderRadius: dimensions.width * 0.043,
                shadowRadius: 5,
              }}>
                <Text
                  style={{
                    fontWeight: 700,
                    color: 'white',
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.055,
                    fontFamily: fontSProTextRegular,
                  }}>
                  Soon
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={{
            width: dimensions.width,
            flex: 1,
            paddingHorizontal: dimensions.width * 0.05,
          }}>
            <View style={{
              paddingHorizontal: dimensions.width * 0.05,
              justifyContent: 'space-between',
              marginBottom: dimensions.height * 0.025,
              flexDirection: 'row',
              alignItems: 'center',
              width: dimensions.width,
              alignSelf: 'flex-start',
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
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.059,
                    fontFamily: fontSProTextRegular,
                  }}>
                  {selectedTieKnotsActivityCategory}
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
                      marginBottom: dimensions.height * 0.034,
                      width: dimensions.width * 0.9,
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={knot.previewImage}
                      style={{
                        borderRadius: dimensions.width * 0.043,
                        height: dimensions.height * 0.25,
                        width: dimensions.width * 0.9,
                      }}
                    />
                    <View style={{
                      width: dimensions.width * 0.9,
                      alignItems: 'center',
                      marginTop: dimensions.height * 0.014,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                      <View style={{
                        width: dimensions.width * 0.77,
                      }}>
                        <Text
                          style={{
                            fontSize: dimensions.width * 0.055,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 700,
                            fontFamily: fontSProTextRegular,
                          }}>
                          {knot.title}
                        </Text>
                        <Text
                          style={{
                            maxWidth: dimensions.width * 0.77,
                            color: '#999999',
                            fontFamily: fontSProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            textAlign: 'left',
                            fontWeight: 400,
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
                  shadowOpacity: 0.28,
                  elevation: 3,
                  borderRadius: dimensions.width * 0.043,
                  backgroundColor: '#02338A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: dimensions.height * 0.25,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  alignSelf: 'center',
                  shadowRadius: 5,
                }}>
                  <Text
                    style={{
                      fontWeight: 700,
                      textAlign: 'left',
                      color: 'white',
                      fontSize: dimensions.width * 0.055,
                      fontFamily: fontSProTextRegular,
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
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollTieKnotsX } } }], {
                      useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    ref={slidesTieKnotsRef}
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
                                  borderRadius: dimensions.width * 0.043,
                                  alignSelf: 'center',
                                  height: dimensions.height * 0.25,
                                  width: dimensions.width * 0.9,
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
                  marginTop: dimensions.height * 0.014,
                  alignSelf: 'center',
                  paddingVertical: dimensions.height * 0.016,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: dimensions.width * 0.9,
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
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                    <TouchableOpacity onPress={() => {
                      if (currentTieKnotIndex > 0) {
                        const newIndex = currentTieKnotIndex - 1;
                        slidesTieKnotsRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                        setCurrentTieKnotIndex(newIndex);
                      }
                    }}
                      disabled={currentTieKnotIndex === 0}
                    >
                      <Image
                        source={require('../assets/icons/chevronLeftIcon.png')}
                        style={{
                          width: dimensions.height * 0.03,
                          height: dimensions.height * 0.03,
                          opacity: currentTieKnotIndex > 0 ? 1 : 0.5,
                        }}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>

                    <View style={{
                      borderRadius: dimensions.height * 0.05,
                      height: dimensions.height * 0.037,
                      marginHorizontal: dimensions.width * 0.05,
                      backgroundColor: '#F1B900',
                      width: dimensions.height * 0.037,
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => {
                      if (currentTieKnotIndex < selectedKnot.stepImages.length - 1) {
                        const newIndex = currentTieKnotIndex + 1;
                        slidesTieKnotsRef.current?.scrollTo({ x: newIndex * dimensions.width * 0.9, animated: true });
                        setCurrentTieKnotIndex(newIndex);
                      }
                    }}
                      disabled={currentTieKnotIndex === selectedKnot.stepImages.length - 1}
                    >
                      <Image
                        source={require('../assets/icons/chevronRightIcon.png')}
                        style={{
                          width: dimensions.height * 0.03,
                          height: dimensions.height * 0.03,
                          opacity: currentTieKnotIndex < selectedKnot.stepImages.length - 1 ? 1 : 0.5,
                        }}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require('../assets/icons/knotRightIcon.png')}
                    style={{
                      height: dimensions.height * 0.037,
                      width: dimensions.height * 0.037,
                    }}
                    resizeMode='contain'
                  />
                </View>

                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.05,
                    paddingHorizontal: dimensions.width * 0.05,
                    fontFamily: fontSProTextRegular,
                    color: 'white',
                    marginTop: dimensions.height * 0.01,
                    fontWeight: 700,
                  }}>
                  {selectedKnot?.title}
                </Text>
                <Text
                  style={{
                    marginTop: dimensions.height * 0.019,
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'left',
                    color: '#999999',
                    width: dimensions.width * 0.9,
                    paddingHorizontal: dimensions.width * 0.05,
                    fontWeight: 500,
                    fontFamily: fontSProTextRegular,
                  }}
                >
                  {selectedKnot.description}
                </Text>
              </ScrollView>
            )}
          </SafeAreaView>
        )
      ) : selectedTieKnotsScreen === 'Settings' ? (
        <SettingsTieKnotsScreen setSelectedTieKnotsScreen={setSelectedTieKnotsScreen} selectedTieKnotsScreen={selectedTieKnotsScreen} />
      ) : selectedTieKnotsScreen === 'Favourites' ? (
        <FavouritesTieKnotsScreen setSelectedTieKnotsScreen={setSelectedTieKnotsScreen} savedKnots={savedKnots} setSavedKnots={setSavedKnots} />
      ) : selectedTieKnotsScreen === 'AdmiralGames' ? (
        <TieKnotsGamesScreen setSelectedTieKnotsScreen={setSelectedTieKnotsScreen} selectedTieKnotsScreen={selectedTieKnotsScreen} />
      ) : null}
    </View>
  );
};

export default HomeTieKnotsScreen;
