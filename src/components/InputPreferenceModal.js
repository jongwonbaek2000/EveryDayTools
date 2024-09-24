import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import PreferenceGroup from './PreferenceGroup';
import palette from '../styles/colors/colorPalette';

const InputPreferenceModal = ({
  focusedItem,
  items,
  onPressModalClose,
  isModalVisible,
  onPressModalOpen,
  addItemToPrefs,
  preferences,
}) => {
  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalView}>
        <View style={{width: '90%'}}>
          <Text style={styles.modalTitleText}>
            <Text style={{color: palette.primary, fontWeight: 'bold'}}>
              {focusedItem.name}
            </Text>
            의 선호도
          </Text>
          <Text style={styles.modalDescription}>
            <Text style={{color: palette.primary}}>선호도가 높은 것부터</Text>{' '}
            순서대로 터치하세요!
          </Text>
          <Text style={styles.modalGroupDescription}>
            {focusedItem.group === 'group1' ? '매칭 그룹 2' : '매칭 그룹 1'}
          </Text>
          <PreferenceGroup
            items={items}
            isModalVisible={isModalVisible}
            onPressModalOpen={onPressModalOpen}
            addItemToPrefs={addItemToPrefs}
            focusedItem={focusedItem}
            preferences={preferences}
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
            onPress={onPressModalClose}
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
