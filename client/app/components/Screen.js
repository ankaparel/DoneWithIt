import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <KeyboardAvoidingView
        behavior="height"    // "padding" or "height" for android
        style={{flex: 1}}
      >
        <View style={[styles.view, style]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
