import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomButton from '../components/BottomButton';
import InputPreferenceModal from '../components/InputPreferenceModal';
import PreferenceGroup from '../components/PreferenceGroup';
import {PreferencesProvider} from '../providers/PreferencesProvider';

function initializePreferencesAndCompletes(groupNumber) {
  // 특정 개수만큼 항목을 생성하는 함수
  const createGroupItems = count => {
    return Array.from({length: count}, (_, index) => `${index + 1}번`);
  };

  // group1과 group2 항목 생성
  const group1Items = createGroupItems(groupNumber.group1);
  const group2Items = createGroupItems(groupNumber.group2);

  // preferences 초기 세팅 (각 항목은 빈 배열로 시작)
  const initialPreferences = {group1: {}, group2: {}};
  group1Items.forEach(item => {
    initialPreferences.group1[item] = []; // 빈 배열로 초기화
  });
  group2Items.forEach(item => {
    initialPreferences.group2[item] = [];
  });

  // isCompleteItems 초기 세팅 (각 항목은 false로 시작)
  const initialIsCompleteItems = {group1: {}, group2: {}};
  group1Items.forEach(item => {
    initialIsCompleteItems.group1[item] = false; // false로 초기화
  });
  group2Items.forEach(item => {
    initialIsCompleteItems.group2[item] = false;
  });

  return {initialPreferences, initialIsCompleteItems, group1Items, group2Items};
}

function InputPreference({navigation, route}) {
  const groupNumber = route.params;
  const {initialPreferences, initialIsCompleteItems, group1Items, group2Items} =
    initializePreferencesAndCompletes(groupNumber);
  const [activeToNext, setActiveToNext] = useState(false);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isCompleteItems, setIsCompleteItems] = useState(
    initialIsCompleteItems,
  );

  const allItems = {group1Items, group2Items};

  function areAllItemsTrue(preferencesItemsBoolean) {
    // 기존 로직: 모든 값이 true인지 확인
    return Object.values(preferencesItemsBoolean).every(group =>
      Object.values(group).every(item => item),
    );
  }

  useEffect(() => {
    if (areAllItemsTrue(isCompleteItems)) {
      setActiveToNext(true);
    } else {
      setActiveToNext(false);
    }
  }, [isCompleteItems]);

  const onPressToNext = () => {
    if (activeToNext) return navigation.navigate('Output', preferences);
  };

  return (
    <PreferencesProvider
      preferences={preferences}
      isCompleteItems={isCompleteItems}
      setPreferences={setPreferences}
      setIsCompleteItems={setIsCompleteItems}
      groupNumber={groupNumber}>
      <View style={styles.container}>
        <View style={styles.mainArea}>
          <PreferenceGroup
            group="group1"
            title="매칭 그룹 1 선호도"
            subtitle="번호를 탭하세요!"
            items={group1Items}
          />
          <PreferenceGroup
            group="group2"
            title="매칭 그룹 2 선호도"
            subtitle="번호를 탭하세요!"
            items={group2Items}
          />
        </View>
        <InputPreferenceModal allItems={allItems} />

        <BottomButton
          isActive={activeToNext}
          title="선호도 입력 완료"
          onPress={onPressToNext}
        />
      </View>
    </PreferencesProvider>
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
    width: '85%',
    paddingTop: 24,
  },
});

export default InputPreference;
