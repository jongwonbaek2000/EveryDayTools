import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import palette from '../styles/colors/colorPalette';
function HomeScreen({navigation}) {
  return (
    <View style={styles.block}>
      <Text style={styles.headerText}>일상의 툴들</Text>
      <View style={[styles.smallLine, {paddingBottom: 20}]} />
      <View style={styles.box}>
        <Image
          style={{marginLeft: 15}}
          source={require('../../assets/icons/matching-image.jpg')}
        />
        <View style={styles.boxInBoxForText}>
          <Text style={styles.itemTitle}>선호도 매칭</Text>
          <View
            style={[
              styles.smallLine,
              {marginBottom: 10, marginHorizontal: 'auto'},
            ]}
          />
          <Text style={styles.itemSubTitle}>설명</Text>
          <Text style={styles.itemText}>
            소개팅, 직원과 지점 매칭, 기숙사 배정, 장기 기증 등의 문제에 활용
            가능!
          </Text>
          <Text style={styles.itemSubTitle}>입력값</Text>
          <Text style={styles.itemText}>
            신청자 개수, 선택자 개수, 각 신청자와 선택자의 선호도
          </Text>
        </View>
      </View>
      {/* <Button
        title="선호도 매칭"
        onPress={() => navigation.push('Detail', {id: 1})}
      /> */}
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
    // backgroundColor: 'yellow',
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

export default HomeScreen;
