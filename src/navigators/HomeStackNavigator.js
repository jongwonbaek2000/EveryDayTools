import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '홈'}}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{title: '선호도 매칭'}}
      />
    </Stack.Navigator>
    // <Text>Home</Text>
  );
}

export default HomeStackNavigator;
