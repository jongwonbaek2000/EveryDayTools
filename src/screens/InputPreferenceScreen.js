import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomButton from '../components/BottomButton';
import InputPreferenceModal from '../components/InputPreferenceModal';
import PreferenceGroup from '../components/PreferenceGroup';
import {PreferencesProvider} from '../providers/PreferencesProvider';

function InputPreference({navigation, route}) {
  const groupNumber = route.params;

  const createGroupItems = count => {
    return Array.from({length: count}, (_, index) => `${index + 1}번`);
  };

  const group1Items = createGroupItems(groupNumber.group1);
  const group2Items = createGroupItems(groupNumber.group2);
  const allItems = {group1Items, group2Items};

  return (
    <PreferencesProvider groupNumber={groupNumber}>
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
          title="선호도 입력 완료"
          onPress={() => navigation.navigate('Output')}
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
