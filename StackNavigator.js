import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';
import LoadingAdmiralTieKnotsScreen from './src/screens/LoadingAdmiralTieKnotsScreen';


const Stack = createNativeStackNavigator();

const TieKnotsOfAdmiralsStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);


  const [initializingTieKnotsOfAdmiralsApp, setInitializingTieKnotsOfAdmiralsApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadTieKnotsOfAdmiralsUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedTieKnotsOfAdmiralsUser = await AsyncStorage.getItem(storageKey);

        if (storedTieKnotsOfAdmiralsUser) {
          setUser(JSON.parse(storedTieKnotsOfAdmiralsUser));
        } 
      } catch (error) {
        console.error('Error loading of tie knots user', error);
      } finally {
        setInitializingTieKnotsOfAdmiralsApp(false);
      }
    };
    loadTieKnotsOfAdmiralsUser();
  }, [setUser]);

  if (initializingTieKnotsOfAdmiralsApp) {
    return (
      <View style={{
        backgroundColor: '#0068B7',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'LoadingAdmiralTieKnotsScreen'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingAdmiralTieKnotsScreen" component={LoadingAdmiralTieKnotsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default TieKnotsOfAdmiralsStack;
