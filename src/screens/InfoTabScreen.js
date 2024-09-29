import React from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import palette from '../styles/colors/colorPalette';

const InfoTabScreen = () => {
  const handlePress = async () => {
    const url = 'http://www.google.com'; // 간단한 HTTP URL 테스트
    const supported = await Linking.canOpenURL(url);

    console.log(`URL 지원 여부: ${supported}`); // URL 지원 여부 로그 추가

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Can't handle the URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Git Repository</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>바로가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: palette.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InfoTabScreen;
