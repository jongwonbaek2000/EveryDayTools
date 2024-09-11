// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import TabNavigator from './src/navigators/TabNavigator';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
// import SplashScreen from 'react-native-splash-screen';

const App = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1000); //스플래시 활성화 시간
  // });

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   introContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   introText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

export default App;
