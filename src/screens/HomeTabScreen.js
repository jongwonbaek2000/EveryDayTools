import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import palette from '../styles/colors/colorPalette';
import layout from '../styles/layouts/layout';

const HomeBlockImage = () => (
  <Image
    style={styles.blockImage}
    source={require('../../assets/icons/matching-image.jpg')}
  />
);

const HomeBlockContent = ({title, description, inputDescription}) => (
  <View style={styles.blockContent}>
    <Text style={styles.itemTitle}>{title}</Text>
    <View style={styles.smallLine} />
    <Text style={styles.itemSubTitle}>설명</Text>
    <Text style={styles.itemText}>{description}</Text>
    <Text style={styles.itemSubTitle}>입력값</Text>
    <Text style={styles.itemText}>{inputDescription}</Text>
  </View>
);

const HomeBlock = ({title, description, inputDescription, onPress}) => (
  <TouchableOpacity style={styles.block} activeOpacity={0.6} onPress={onPress}>
    <HomeBlockImage />
    <HomeBlockContent
      title={title}
      description={description}
      inputDescription={inputDescription}
    />
  </TouchableOpacity>
);

const HomeTabScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.headerText}>일상의 툴들</Text>
    <View style={styles.headerLine} />
    <HomeBlock
      title="선호도 매칭"
      description="소개팅, 직원과 지점 매칭, 기숙사 배정, 장기 기증 등의 문제에 활용 가능!"
      inputDescription="신청자 개수, 선택자 개수, 각 신청자와 선택자의 선호도"
      onPress={() => navigation.navigate('Algorithm')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  headerLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    marginBottom: 20,
  },
  block: {
    borderColor: palette._d9,
    borderWidth: 1,
    width: `${layout.widthSystem * 100}%`,
    minHeight: 250,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockImage: {
    marginVertical: 15,
    marginLeft: 15,
  },
  blockContent: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  smallLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    marginBottom: 4,
    alignSelf: 'center',
  },
  itemTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'center',
  },
  itemSubTitle: {
    color: 'black',
    fontSize: 12,
    marginBottom: 2,
  },
  itemText: {
    fontSize: 12,
    color: palette._7,
    marginBottom: 10,
  },
});

export default HomeTabScreen;
