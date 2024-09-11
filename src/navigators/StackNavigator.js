import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AlgorithmScreen from '../screens/AlgorithmScreen';
import GroupSetting from '../screens/GroupSetting';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: '홈'}}
      />
      <Stack.Screen
        name="Algorithm"
        component={AlgorithmScreen}
        options={{title: '알고리즘 설명'}}
      />
      <Stack.Screen
        name="GroupSetting"
        component={GroupSetting}
        options={{title: '그룹 세팅'}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
