import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import palette from '../styles/colors/colorPalette';

function HomeBlock({title, description, inputDescription, onPress}) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.box}>
        <Image
          style={{marginLeft: 15}}
          source={require('../../assets/icons/matching-image.jpg')}
        />
        <View style={styles.boxInBoxForText}>
          <Text style={styles.itemTitle}>{title}</Text>
          <View
            style={[
              styles.smallLine,
              {marginBottom: 10, marginHorizontal: 'auto'},
            ]}
          />
          <Text style={styles.itemSubTitle}>설명</Text>
          <Text style={styles.itemText}>{description}</Text>
          <Text style={styles.itemSubTitle}>입력값</Text>
          <Text style={styles.itemText}>{inputDescription}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function HomeTabScreen({navigation}) {
  return (
    <View style={styles.block}>
      <Text style={styles.headerText}>일상의 툴들</Text>
      <View style={[styles.smallLine, {paddingBottom: 20}]} />
      <HomeBlock
        title="선호도 매칭"
        description="소개팅, 직원과 지점 매칭, 기숙사 배정, 장기 기증 등의 문제에 활용
              가능!"
        inputDescription="신청자 개수, 선택자 개수, 각 신청자와 선택자의 선호도"
        onPress={() => navigation.push('Algorithm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 20,
  },
  smallLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    justifyContent: 'center',
  },
  box: {
    borderColor: palette._d9,
    borderWidth: 1,
    width: 312,
    height: 251,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxInBoxForText: {
    width: 124,
    height: 208,
    margin: 'auto',
  },
  itemTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 'auto',
  },
  itemSubTitle: {color: 'black', fontSize: 12, marginBottom: 2},
  itemText: {fontSize: 12, color: palette._7, marginBottom: 10},
});

export default HomeTabScreen;
