import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PreferenceGroup from './PreferenceGroup';
import palette from '../styles/colors/colorPalette';
import {PreferencesContext} from '../providers/PreferencesProvider';

const MAX_KOREAN_LENGTH = 3; // 한글 최대 글자 수
const MAX_ENGLISH_LENGTH = 6; // 영어 최대 글자 수

const InputPreferenceModal = () => {
  const {
    focusedItem,
    setFocusedItem,
    onPressModalClose,
    isModalVisible,
    onRemovePrefOfItem,
    onPressRandomPref,
    groupTitles,
    setAllItems,
    allItems,
    setPreferences,
    setIsCompleteItems,
  } = useContext(PreferencesContext);

  const [itemName, setItemName] = useState(focusedItem.name);
  const [isItemNameInput, setIsItemNameInput] = useState(false);

  const groupCode =
    focusedItem.group === 'group1' ? 'group1Items' : 'group2Items';
  const displayGroup =
    focusedItem.group === 'group1' ? 'group2Items' : 'group1Items';

  const countCharacters = text => {
    const koreanPattern = /[\u3131-\uD79D]/;
    let koreanCount = 0;
    let englishCount = 0;

    for (let char of text) {
      if (koreanPattern.test(char)) {
        koreanCount++;
      } else {
        englishCount++;
      }
    }

    return {koreanCount, englishCount};
  };

  const onChangeItemName = text => {
    const {koreanCount, englishCount} = countCharacters(text);

    if (
      koreanCount <= MAX_KOREAN_LENGTH &&
      englishCount <= MAX_ENGLISH_LENGTH
    ) {
      setItemName(text);
    }
  };
  //이름이 변경되는 순간 prefs에서 자신의 아이템에 해당하는 요소를 모두 찾아. 변경된 이름으로 바꾸어주어야 함.
  const onSubmitItemName = () => {
    const updateGroup = (group, oldName, newName, isSameGroup) => {
      const updatedGroup = {...group};
      if (isSameGroup) {
        // 같은 그룹 내에서는 키만 변경하고 배열은 그대로 유지
        updatedGroup[newName] = updatedGroup[oldName];
        delete updatedGroup[oldName];
      } else {
        // 다른 그룹에서는 배열 내의 이름만 변경
        Object.keys(updatedGroup).forEach(key => {
          if (Array.isArray(updatedGroup[key])) {
            updatedGroup[key] = updatedGroup[key].map(item =>
              item === oldName ? newName : item,
            );
          }
        });
      }
      return updatedGroup;
    };
    // 만약 itemName이 비어있다면 이전 focusedItem.name으로 되돌림
    if (itemName.trim() === '') {
      setItemName('');
      setIsItemNameInput(false); // 이름 입력 모드 해제
      return; // 아무런 업데이트 없이 함수 종료
    }
    // 동일한 이름의 아이템이 존재하는지 확인
    const existingItems = allItems[groupCode];
    const isDuplicate = existingItems.includes(itemName);

    if (isDuplicate) {
      Alert.alert('Error', '동일한 그룹 내에 이미 존재하는 이름입니다.');
      setItemName(''); // 기존 이름으로 되돌림
      setIsItemNameInput(false); // 이름 입력 모드 해제
      return;
    }
    setPreferences(prev => {
      const updatedState = {...prev};
      const sourceGroupKey = focusedItem.group;
      const targetGroupKey = sourceGroupKey === 'group1' ? 'group2' : 'group1';

      updatedState[sourceGroupKey] = updateGroup(
        updatedState[sourceGroupKey],
        focusedItem.name,
        itemName,
        true,
      );

      updatedState[targetGroupKey] = updateGroup(
        updatedState[targetGroupKey],
        focusedItem.name,
        itemName,
        false,
      );

      return updatedState;
    });

    setIsCompleteItems(prev => {
      const updatedState = {...prev};
      const sourceGroupKey = focusedItem.group;
      const targetGroupKey = sourceGroupKey === 'group1' ? 'group2' : 'group1';

      updatedState[sourceGroupKey] = updateGroup(
        updatedState[sourceGroupKey],
        focusedItem.name,
        itemName,
        true,
      );

      updatedState[targetGroupKey] = updateGroup(
        updatedState[targetGroupKey],
        focusedItem.name,
        itemName,
        false,
      );

      return updatedState;
    });

    setAllItems(prev => ({
      ...prev,
      [groupCode]: prev[groupCode].map(item =>
        item === focusedItem.name ? itemName : item,
      ),
    }));
    setFocusedItem(prev => ({
      ...prev,
      name: itemName,
    }));
    setItemName('');
    setIsItemNameInput(false);
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}} // 전체 화면을 덮도록 설정
      >
        <View style={styles.modalView}>
          <View style={{width: '90%'}}>
            <View>
              {isItemNameInput ? (
                <TextInput
                  returnKeyType="done"
                  style={[
                    styles.itemName,
                    {marginTop: 10, marginHorizontal: 'auto'},
                  ]}
                  value={itemName}
                  placeholder={itemName}
                  placeholderTextColor={palette.primary}
                  onChangeText={onChangeItemName}
                  onBlur={onSubmitItemName}
                  onSubmitEditing={onSubmitItemName}
                  maxLength={Math.max(MAX_KOREAN_LENGTH, MAX_ENGLISH_LENGTH)} // 최대 길이 설정
                  autoFocus
                />
              ) : (
                <Text style={styles.modalTitleText}>
                  <Text style={styles.itemName}>{focusedItem.name}</Text>의
                  선호도
                </Text>
              )}

              <TouchableOpacity
                onPress={() => setIsItemNameInput(true)}
                activeOpacity={0.6}
                style={[styles.smallButton, {marginTop: 20}]}>
                <Text style={styles.smallButtonText}>이름 변경</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              <Text style={{color: palette.primary}}>선호도가 높은 것부터</Text>{' '}
              순서대로 터치하세요!
            </Text>
            <View>
              <Text style={styles.modalGroupDescription}>
                {focusedItem.group === 'group1'
                  ? groupTitles.group2
                  : groupTitles.group1}
              </Text>
              <TouchableOpacity
                onPress={() => onPressRandomPref(focusedItem)}
                activeOpacity={0.6}
                style={styles.smallButton}>
                <Text style={styles.smallButtonText}>랜덤 선호도</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}} />
            <PreferenceGroup
              group={focusedItem.group === 'group1' ? 'group2' : 'group1'}
              items={allItems[displayGroup]}
              isModal={true}
            />
          </View>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onRemovePrefOfItem(focusedItem)}
              style={styles.modalBottomButtonLeft}>
              <Text
                style={{fontSize: 16, color: palette.primary, margin: 'auto'}}>
                되돌리기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressModalClose}
              style={styles.modalBottomButtonRight}>
              <Text style={{fontSize: 16, color: 'white', margin: 'auto'}}>
                저장
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /**
   * 모달 화면 영역
   */
  modalView: {
    width: '90%',
    height: '80%',
    marginTop: 70,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemName: {color: palette.primary, fontSize: 20, fontWeight: 'bold'},
  smallButtonText: {marginTop: -2, fontSize: 12, color: palette.primary},
  smallButton: {
    position: 'absolute',
    right: 0,
    width: 80,
    height: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: palette.primary,
    borderWidth: 1,
  },
  modalTitleText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  modalDescription: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 50,
  },
  modalGroupDescription: {
    textAlign: 'center',
    color: palette._7,
    fontSize: 16,
    marginBottom: 20,
  },
  modalBottomButtonLeft: {
    width: 200,
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: palette.primary,
    borderWidth: 1,
  },
  modalBottomButtonRight: {
    width: 76,
    height: 48,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default InputPreferenceModal;
