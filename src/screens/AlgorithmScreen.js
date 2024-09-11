import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import palette from '../styles/colors/colorPalette';
import BottomButton from '../components/BottomButton';

function AlgorithmScreen({navigation}) {
  return (
    <View style={styles.block}>
      <View style={styles.block}>
        <Text style={styles.smallText}>선호도 매칭</Text>
        <Text style={styles.title}>Gale-Shaply Algorithm</Text>
        <View style={[styles.smallLine, {marginBottom: 30}]}></View>
        <Image
          source={require('../../assets/icons/gale-shaply-image.jpg')}
          style={{width: 312}}
        />
      </View>
      <BottomButton
        title="시작하기"
        onPress={() => navigation.push('GroupSetting')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  smallLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    justifyContent: 'center',
  },
  smallText: {fontSize: 12, marginTop: 30, color: palette._7},
  title: {
    fontSize: 24,
    marginTop: 8,
    color: 'black',
    marginBottom: 15,
  },
  bottom: {
    width: 312,
    height: 41,
    backgroundColor: palette.primary,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  bottomText: {fontSize: 18, color: 'white'},
});

export default AlgorithmScreen;
