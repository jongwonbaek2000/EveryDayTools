//basics
import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

//navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//style
import palette from '../styles/colors/colorPalette';

//screens
import HomeTabScreen from '../screens/HomeTabScreen';
import InfoTabScreen from '../screens/InfoTabScreen';
import {NavigationContext} from '../providers/NavigationProvider';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const {headerShown, setHeaderShown} = useContext(NavigationContext);
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: headerShown.tab,
        tabBarStyle: {height: 60},
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
        name="InfoTab"
        component={InfoTabScreen}
        options={{
          title: '정보',
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
