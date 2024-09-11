import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import palette from '../styles/colors/colorPalette';
function AlgorithmScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <View style={styles.block}>
        <Text style={{fontSize: 12, marginTop: 30, color: palette._7}}>
          선호도 매칭
        </Text>

        <Text
          style={{
            fontSize: 24,
            marginTop: 8,
            color: 'black',
            marginBottom: 15,
          }}>
          Gale-Shaply Algorithm
        </Text>
        <View style={[styles.smallLine, {marginBottom: 30}]}></View>
        <Image
          source={require('../../assets/icons/gale-shaply-image.jpg')}
          style={{width: 312}}
        />
        <Button
          title="선호도 매칭"
          onPress={() => navigation.push('Detail', {id: 1})}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Home')}>
        <View
          title="시작하기"
          style={{
            width: 312,
            height: 41,
            backgroundColor: palette.primary,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>시작하기</Text>
        </View>
      </TouchableOpacity>
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
});

export default AlgorithmScreen;
