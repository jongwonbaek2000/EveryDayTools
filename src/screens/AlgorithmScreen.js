import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import BottomButton from '../components/BottomButton';
import palette from '../styles/colors/colorPalette';
import layout from '../styles/layouts/layout';

const AlgorithmHeader = ({smallText, title}) => (
  <>
    <Text style={styles.smallText}>{smallText}</Text>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.smallLine} />
  </>
);

const AlgorithmImage = ({width, source}) => (
  <AutoHeightImage
    width={Math.round(width * layout.widthSystem)}
    source={source}
  />
);

const AlgorithmScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const handleStart = () => navigation.navigate('GroupSetting');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AlgorithmHeader
          smallText="선호도 매칭"
          title="Gale-Shaply Algorithm"
        />
        <AlgorithmImage
          width={width}
          source={require('../../assets/icons/gale-shaply-image.jpg')}
        />
      </View>
      <BottomButton title="시작하기" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  smallLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    marginBottom: 30,
  },
  smallText: {
    fontSize: 12,
    marginTop: 30,
    color: palette._7,
  },
  title: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 15,
    color: 'black',
  },
});

export default AlgorithmScreen;
