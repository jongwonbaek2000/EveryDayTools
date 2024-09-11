import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function AlgorithmScreen({navigation}) {
  return (
    <View>
      <Text style={{fontSize: 24}}>일상의 툴들</Text>
      <Button
        title="선호도 매칭"
        onPress={() => navigation.push('Detail', {id: 1})}
      />
    </View>
  );
}

export default AlgorithmScreen;
