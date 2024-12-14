// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, Alert} from 'react-native';
import Home from './src/screens/Home';
import Blog from './src/screens/Blogs';
import BlogShow from './src/screens/BlogShow';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile';
import AssessmentIntro from './src/screens/AssessmentIntro';
import AssessmentLanguage from './src/screens/AssessmentLanguage';
import Assessment from './src/screens/Assessment';
import Explanation from './src/screens/Explanation';
import About from './src/screens/About';
import Result from './src/screens/Result';
import EditProfile from './src/screens/EditProfil';
import AssessmentPerson from './src/screens/AssessmentPerson';
import Symptoms from './src/screens/Symptoms';
import RsNearby from './src/screens/RsNearby';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import PrivacyPolicy from './src/screens/PrivacyPolicy';

const Stack = createNativeStackNavigator();

function initFirebaseNotificationHandler() {
  console.log('Device Version :', DeviceInfo.getVersion());
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage.data);
    if (
      remoteMessage.data?.type != 'new_version' ||
      remoteMessage.data?.version != DeviceInfo.getVersion()
    ) {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    }
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

async function requestUserPermission() {
  if (Platform.OS == 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('Token FCM :', token);
}

function App() {
  requestUserPermission();
  React.useEffect(() => {
    initFirebaseNotificationHandler();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="BlogShow" component={BlogShow} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="AssessmentIntro" component={AssessmentIntro} />
        <Stack.Screen
          name="AssessmentLanguage"
          component={AssessmentLanguage}
        />
        <Stack.Screen name="Assessment" component={Assessment} />
        <Stack.Screen name="Explanation" component={Explanation} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AssessmentPerson" component={AssessmentPerson} />
        <Stack.Screen name="Symptoms" component={Symptoms} />
        <Stack.Screen name="RsNearby" component={RsNearby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
