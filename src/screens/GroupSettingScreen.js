import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
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
  onLongPressTitle, // 꾹 누르기 핸들러 추가
  isEditing,
  onChangeTitle,
  onSubmitTitle,
}) {
  return (
    <View style={styles.box}>
      <View style={styles.textBox}>
        <View style={styles.row}>
          <TouchableOpacity onLongPress={onLongPressTitle}>
            {isEditing ? (
              <TextInput
                style={styles.largeText}
                value={title}
                onChangeText={onChangeTitle}
                onBlur={onSubmitTitle}
                onSubmitEditing={onSubmitTitle}
                autoFocus // 텍스트 입력 시 자동으로 키보드 활성화
              />
            ) : (
              <Text style={styles.largeText}>{title}</Text>
            )}
          </TouchableOpacity>
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

  const [groupTitles, setGroupTitles] = useState({
    group1: '매칭 그룹 1',
    group2: '매칭 그룹 2',
  });

  const [editingGroup, setEditingGroup] = useState(null); // 현재 수정 중인 그룹

  // 그룹 넘버 업데이트 핸들러 함수
  const updateGroupNumber = (group, delta) => {
    setGroupNumber(prev => ({
      ...prev,
      [group]: Math.min(Math.max(prev[group] + delta, 0), 10), // 최소 0, 최대 10으로 설정
    }));
  };

  // 그룹 이름 수정 핸들러
  const handleLongPress = group => {
    setEditingGroup(group); // 꾹 누르기 시 편집 모드 활성화
  };

  const handleChangeTitle = (group, newTitle) => {
    setGroupTitles(prev => ({
      ...prev,
      [group]: newTitle,
    }));
  };

  const handleSubmitTitle = () => {
    setEditingGroup(null); // 입력 완료 시 편집 모드 종료
  };

  return (
    <View style={styles.block}>
      <View style={[styles.block, {width: '100%'}]}>
        <SettingBlock
          title={groupTitles.group1}
          description="꾹 눌러 이름 변경"
          mainNumber={groupNumber.group1}
          onPressUp={() => updateGroupNumber('group1', 1)}
          onPressDown={() => updateGroupNumber('group1', -1)}
          onLongPressTitle={() => handleLongPress('group1')} // 더블 탭 대신 꾹 누르기
          isEditing={editingGroup === 'group1'}
          onChangeTitle={text => handleChangeTitle('group1', text)}
          onSubmitTitle={handleSubmitTitle}
        />
        <SettingBlock
          title={groupTitles.group2}
          description="꾹 눌러 이름 변경"
          mainNumber={groupNumber.group2}
          onPressUp={() => updateGroupNumber('group2', 1)}
          onPressDown={() => updateGroupNumber('group2', -1)}
          onLongPressTitle={() => handleLongPress('group2')} // 더블 탭 대신 꾹 누르기
          isEditing={editingGroup === 'group2'}
          onChangeTitle={text => handleChangeTitle('group2', text)}
          onSubmitTitle={handleSubmitTitle}
        />
      </View>
      <BottomButton
        title="그룹 세팅"
        onPress={() =>
          navigation.navigate('InputPreference', {groupTitles, groupNumber})
        }
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
