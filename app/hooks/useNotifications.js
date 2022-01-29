import { useEffect } from "react";
import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
import * as Device from "expo-device";

import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    // registerForPushNotifications();
    registerForPushNotificationsAsync();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  // const registerForPushNotifications = async () => {
  //   try {
  //     const permission = await Permissions.requestPermissionsAsync(Permissions.NOTIFICATIONS);
  //     if (!permission.granted) return;

  //     const token = await Notifications.getExpoPushTokenAsync();
  //     expoPushTokensApi.register(token);
  //   } catch (error) {
  //     console.log("Error getting a push token", error);
  //   }
  // };
  registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // this.setState({ expoPushToken: token });
      expoPushTokensApi.register(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Device.isDevice && Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };
};
