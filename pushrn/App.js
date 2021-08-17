import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import OneSignal from 'react-native-onesignal';

export default function App() {

  // Design
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("65ad2e55-b57d-4730-802c-f48ca0ba6773");

  //iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log("Prompt response:", response);
  });

  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    notificationReceivedEvent.complete(notification);
  });

  OneSignal.setNotificationOpenedHandler(notification => {
    // console.log("OneSignal: notification opened:", notification);
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Video style={styles.video}
          shouldPlay
          source={require('./assets/splash-screen.mp4')}
          volume={10} />
      </View>
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: 'https://organizatudo.netlify.app/login' }} />
      </View >
    </View >
  );

};


const styles = StyleSheet.create({
  video: {
    margin: 60,
    marginTop: 80,
    height: 512,
    width: 512,
  }
});
