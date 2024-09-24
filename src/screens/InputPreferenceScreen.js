import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import BottomButton from '../components/BottomButton';
import palette from '../styles/colors/colorPalette';
import layout from '../styles/layouts/layout';
import AutoHeightImage from 'react-native-auto-height-image';
import InputPreferenceModal from '../components/InputPreferenceModal';
import PreferenceGroup from '../components/PreferenceGroup';

function InputPreference({navigation, route}) {
  const groupNumber = route.params;
  // 그룹의 크기에 따라 배열을 생성
  const createGroupItems = count => {
    return Array.from({length: count}, (_, index) => `${index + 1}번`);
  };

  // 그룹1과 그룹2의 개수에 맞게 아이템 생성
  const group1Items = createGroupItems(groupNumber.group1);
  const group2Items = createGroupItems(groupNumber.group2);

  const [focusedItem, setFocusedItem] = useState({name: '', group: 'group1'});
  const [preferences, setPreferences] = useState({group1: {}, group2: {}});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompleteItems, setIsCompleteItems] = useState({
    group1: {},
    group2: {},
  });

  const addItemToPrefs = (item, selectedItem) => {
    setPreferences(prev => {
      // 현재 선택된 아이템이 이미 존재하는지 확인
      const currentGroup = prev[item.group][item.name] || [];
      if (currentGroup.includes(selectedItem)) {
        // 이미 존재하면 추가하지 않고 이전 상태 반환
        return prev;
      }

      // 새로운 preferences 상태 업데이트
      const newPreferences = {
        ...prev,
        [item.group]: {
          ...prev[item.group],
          [item.name]: currentGroup.concat(selectedItem),
        },
      };

      // 상대 그룹의 아이템 개수와 현재 그룹의 특정 아이템 배열의 길이가 같아지면 완료 상태로 설정
      const oppositeGroup = item.group === 'group1' ? 'group2' : 'group1';
      const isComplete =
        newPreferences[item.group][item.name].length ===
        groupNumber[oppositeGroup];

      // 완료 상태 업데이트
      if (isComplete) {
        setIsCompleteItems(prev => ({
          ...prev,
          [item.group]: {
            ...prev[item.group],
            [item.name]: true,
          },
        }));
      }

      return newPreferences;
    });
  };

  const onPressModalOpen = ({name, group}) => {
    setFocusedItem({name, group}); // 탭한 아이템과 그룹 저장
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
        <PreferenceGroup
          group="group1"
          title="매칭 그룹 1 선호도"
          subtitle="번호를 탭하세요!"
          items={group1Items}
          onPressModalOpen={onPressModalOpen}
          isCompleteItems={isCompleteItems}
        />
        <PreferenceGroup
          group="group2"
          title="매칭 그룹 2 선호도"
          subtitle="번호를 탭하세요!"
          items={group2Items}
          onPressModalOpen={onPressModalOpen}
          isCompleteItems={isCompleteItems}
        />
      </View>
      <InputPreferenceModal
        isModalVisible={isModalVisible}
        onPressModalClose={onPressModalClose}
        onPressModalOpen={onPressModalOpen}
        focusedItem={focusedItem}
        items={group2Items}
        preferences={preferences}
        addItemToPrefs={addItemToPrefs}
      />

      <BottomButton
        title="선호도 입력 완료"
        onPress={() => navigation.navigate('Output')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainArea: {
    flex: 1,
    width: `${layout.widthSystem * 100}%`,
    paddingTop: 24,
  },
});

export default InputPreference;
