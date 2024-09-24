import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PlatformColor,
} from 'react-native';
import palette from '../styles/colors/colorPalette';
import BottomButton from '../components/BottomButton';
import layout from '../styles/layouts/layout';
import AutoHeightImage from 'react-native-auto-height-image';

function UpButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <AutoHeightImage
        width={48}
        source={require('../../assets/icons/up-icon.png')}
      />
    </TouchableOpacity>
  );
}

function DownButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <AutoHeightImage
        width={48}
        style={{marginTop: 15}}
        source={require('../../assets/icons/down-icon.png')}
      />
    </TouchableOpacity>
  );
}

function SettingBlock({
  title,
  description,
  mainNumber,
  onPressUp,
  onPressDown,
}) {
  return (
    <View style={styles.box}>
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
        <UpButton onPress={onPressUp} />
        <DownButton onPress={onPressDown} />
      </View>
    </View>
  );
}

function GroupSetting({navigation}) {
  const [groupNumber, setGroupNumber] = useState({
    group1: 3,
    group2: 5,
  });

  // 그룹 넘버 업데이트 핸들러 함수
  const updateGroupNumber = (group, delta) => {
    setGroupNumber(prev => ({
      ...prev,
      [group]: Math.min(Math.max(prev[group] + delta, 0), 10), // 최소 0, 최대 10으로 설정
    }));
  };

  return (
    <View style={styles.block}>
      <View style={[styles.block, {width: '100%'}]}>
        <SettingBlock
          title="매칭 그룹 1"
          description="더블 탭으로 입력하세요!"
          mainNumber={groupNumber.group1}
          onPressUp={() => updateGroupNumber('group1', 1)}
          onPressDown={() => updateGroupNumber('group1', -1)}
        />
        <SettingBlock
          title="매칭 그룹 2"
          description="더블 탭으로 입력하세요!"
          mainNumber={groupNumber.group2}
          onPressUp={() => updateGroupNumber('group2', 1)}
          onPressDown={() => updateGroupNumber('group2', -1)}
        />
      </View>
      <BottomButton
        title="그룹 세팅"
        onPress={() => navigation.navigate('InputPreference', groupNumber)}
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
    width: `${layout.widthSystem * 100}%`,
    // marginHorizontal: 'auto',
    minHeight: 140,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  textBox: {
    position: 'absolute',
    left: 20,
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
  mainNumber: {
    textDecorationColor: palette._7,
    position: 'absolute',
    right: 85,
    fontSize: 32,
    color: 'black',
  },
  buttons: {
    position: 'absolute',
    right: 20,
    marginVertical: 10,
  },
});

export default GroupSetting;
