//basics
import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

//navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//style
import palette from '../styles/colors/colorPalette';

//screens
import HomeTabScreen from '../screens/HomeTabScreen';
import AlgorithmTabScreen from '../screens/AlgorithmTabScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 55},
        tabBarLabelStyle: {fontSize: 12, paddingBottom: 6},
        tabBarActiveTintColor: palette.primary,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTabScreen}
        options={{
          title: '홈',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/icons/icon-home-activated.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icons/icon-home-default.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="AlgorithmTab"
        component={AlgorithmTabScreen}
        options={{
          title: '알고리즘',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/icons/more-vert-activated.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icons/more-vert-default.png')}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
