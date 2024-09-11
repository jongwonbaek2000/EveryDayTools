import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import palette from '../styles/colors/colorPalette';
import BottomButton from '../components/BottomButton';

function Block({title, description, mainNumber}) {
  return (
    <View style={[styles.box, {marginTop: 30, flexDirection: 'row'}]}>
      <View style={styles.textBox}>
        <View style={styles.row}>
          <Text style={styles.largeText}>{title}</Text>
          <Image
            source={require('../../assets/icons/edit.png')}
            style={styles.edit}
          />
        </View>
        <Text style={styles.smallText}>{description}</Text>
      </View>
      <Text style={styles.mainNumber}>{mainNumber}</Text>
      <View style={styles.buttons}>
        <Image source={require('../../assets/icons/up-icon.png')} />
        <Image
          style={{marginTop: 6}}
          source={require('../../assets/icons/down-icon.png')}
        />
      </View>
    </View>
  );
}

function GroupSetting({navigation}) {
  return (
    <View style={styles.block}>
      <View style={styles.block}>
        <Block
          title="매칭 그룹 1"
          description="더블 탭으로 입력하세요!"
          mainNumber="7"
        />
        <Block
          title="매칭 그룹 2"
          description="더블 탭으로 입력하세요!"
          mainNumber="5"
        />
      </View>
      <BottomButton
        title="그룹 세팅"
        onPress={() => navigation.navigate('HomeTab')}
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
  box: {
    borderColor: palette._d9,
    borderWidth: 1,
    width: 312,
    height: 109,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textBox: {
    marginLeft: 30,
    marginTop: -6,
  },
  row: {flexDirection: 'row', alignItems: 'center'},

  edit: {
    width: 24,
    height: 24,
    marginLeft: 2,
    marginTop: 4,
  },
  largeText: {fontSize: 16, color: 'black'},
  smallText: {fontSize: 12, color: palette._7, marginTop: 8},
  mainNumber: {marginLeft: 86, fontSize: 32, color: 'black'},
  buttons: {marginLeft: 17, marginRight: 17},
});

export default GroupSetting;
