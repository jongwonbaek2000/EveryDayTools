import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlgorithmScreen from '../screens/AlgorithmScreen';

const Stack = createNativeStackNavigator();

function AlgorithmStackNavigator({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Algorithm"
        component={AlgorithmScreen}
        options={{title: '알고리즘 설명'}}
      />
    </Stack.Navigator>
  );
}

export default AlgorithmStackNavigator;
