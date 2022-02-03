import React, { useState, useEffect } from "react";
// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
// import {Provider} from 'react-redux';

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import logger from "./app/utility/logger";
// import store from './app/redux/store';

logger.start()

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading 
        startAsync={restoreUser} 
        onError={() => console.log('error loading app')} 
        onFinish={() => setIsReady(true)} />
    );
  }

  return (
    // <Provider store={store}>
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    // </Provider>      
  );
}