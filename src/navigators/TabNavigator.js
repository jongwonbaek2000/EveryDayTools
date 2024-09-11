//basics
import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

//navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import AlgorithmStackNavigator from './AlgorithmStackNavigator';
//style
import palette from '../styles/colors/colorPalette';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 55},
        tabBarLabelStyle: {fontSize: 12, paddingBottom: 6},
        tabBarActiveTintColor: palette.primary,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
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
        name="Algorithm"
        component={AlgorithmStackNavigator}
        options={{
          title: '알고리즘 설명',
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

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default TabNavigator;
