import React, {useState, createContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AlgorithmScreen from '../screens/AlgorithmScreen';
import GroupSettingScreen from '../screens/GroupSettingScreen';
import InputPreferenceScreen from '../screens/InputPreferenceScreen';
import OutputScreen from '../screens/OutputScreen';
import {NavigationProvider} from '../providers/NavigationProvider';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const [headerShown, setHeaderShown] = useState({
    stack: false,
    tab: true,
  });

  return (
    <NavigationProvider
      headerShown={headerShown}
      setHeaderShown={setHeaderShown}>
      <Stack.Navigator screenOptions={{headerShown: headerShown.stack}}>
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
          component={GroupSettingScreen}
          options={{title: '그룹 세팅'}}
        />
        <Stack.Screen
          name="InputPreference"
          component={InputPreferenceScreen}
          options={{title: '선호도 입력'}}
        />
        <Stack.Screen
          name="Output"
          component={OutputScreen}
          options={{title: '선호도 입력'}}
        />
      </Stack.Navigator>
    </NavigationProvider>
  );
}

export default StackNavigator;
