import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AlgorithmScreen from '../screens/AlgorithmScreen';

const Stack = createNativeStackNavigator();

function HomeStackNavigator({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '홈'}}
      />

      <Stack.Screen
        name="Algorithm"
        component={AlgorithmScreen}
        options={{title: '알고리즘 설명'}}
      />
    </Stack.Navigator>
    // <Text>Home</Text>
  );
}

export default HomeStackNavigator;
