import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { Audio } from 'expo-av';

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];


function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());
  const [playbackStatus, setPlaybackStatus] = useState(null);  
  const [playUrl, setPlayUrl] = useState('http://in.icss.com.gr:8000/stream_028');

  // initialize Audit settings & release sound when exit
  useEffect(async () => {
    console.log('Sound initiation');
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    
    return () => {
      if (playbackObject !== null) {
        playbackObject.pauseAsync();
        playbackObject.unloadAsync();
        console.log('Sound released')
      }
    }
  }, []);

  // change sound when playUrl is changed
  const handleChangeStream = () => {
    const streamNo = Math.floor(Math.random() * 16) + 1;
    const url = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${streamNo}.mp3`;
    setPlayUrl(url);
  }

  // change sound when playUrl have been updated
  useEffect(async () => {
    console.log('new url=', playUrl)
    if (playbackObject !== null && playbackStatus === null) {
      console.log('new object')

    } else if (playbackStatus.isPlaying) {
      console.log('is playing')

      await playbackObject.pauseAsync();
      setIsPlaying(false);
      setPlaybackStatus(null);
      
      await playbackObject.unloadAsync();    

    } else if (!playbackStatus.isPlaying) {
      console.log('not playing')

      await playbackObject.unloadAsync();
    }

    const status = await playbackObject.loadAsync(
      { uri: playUrl },
      { shouldPlay: isPlaying }
    );
    setIsPlaying(isPlaying);
    setPlaybackStatus(status);
    console.log('end of playUrl hook')
  }, [playUrl])
    
  // change between play-pause of a sound
  // when playing status have been changed
  useEffect(async () => {
    if (playbackStatus === null) {
      console.log('isPlaying bypassed')
      return
    }

    if (isPlaying) {
      // It will resume our audio
      console.log('isPlaying true')
      const status = await playbackObject.playAsync();
      setPlaybackStatus(status);
      
    } else {
      // It will pause our audio
      console.log('isPlaying false')
      const status = await playbackObject.pauseAsync();
      setPlaybackStatus(status);
      
    }

  }, [isPlaying]);

  // handles play/pause button press 
  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      console.log('should not pass.....')
      // await Audio.setAudioModeAsync({
      //   allowsRecordingIOS: false,
      //   staysActiveInBackground: true,
      //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      //   playsInSilentModeIOS: true,
      //   shouldDuckAndroid: true,
      //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      // });

      // const status = await playbackObject.loadAsync(
      //   { uri: playUrl },
      //   { shouldPlay: true }
      // );
      // setPlaybackStatus(status);
      return setIsPlaying(true);
    }

    // It will pause our audio
    if (playbackStatus.isPlaying) {
      console.log('set isPlaying to false')
      return setIsPlaying(false);
    }

    // It will resume our audio
    if (!playbackStatus.isPlaying) {
      console.log('set isPlaying to true')
      return setIsPlaying(true);
    }
  };  


  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Button title={isPlaying ? "Stop Sound":"Play Sound"} onPress={handleAudioPlayPause} />
        <Button title="Change stream" onPress={handleChangeStream} />
      </View>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => {
                if (item.targetScreen) navigation.navigate(item.targetScreen)
              }}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
