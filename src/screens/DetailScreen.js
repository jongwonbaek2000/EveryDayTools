import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function DetailScreen({navigation, route}) {
  return (
    <View style={styles.buttons}>
      <Text style={styles.text}>id: {route.params.id}</Text>
      <View style={styles.buttons}>
        <Button
          title="다음"
          onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
        />
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
  },
});

export default DetailScreen;
