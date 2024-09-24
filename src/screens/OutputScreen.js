import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import layout from '../styles/layouts/layout';
import palette from '../styles/colors/colorPalette';
import AutoHeightImage from 'react-native-auto-height-image';

const Item = React.memo(({name, onPressModalOpen}) => (
  <View style={styles.item}>
    <TouchableOpacity activeOpacity={0.6}>
      <AutoHeightImage
        width={48}
        source={require('../../assets/icons/cell-icon-activated.png')}
      />
    </TouchableOpacity>
    <Text style={styles.itemName}>{name}</Text>
  </View>
));

function OutputScreen() {
  const lineBetweenOffset = 24;
  const lineBetweenHeight = 77;
  const numberOfItemLines = Array.from({length: 5}, (v, i) => i);
  //[0,1,2...]

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          width: '100%',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16, color: 'black'}}>매칭 그룹 1</Text>
        <Text style={{fontSize: 16, color: 'black'}}>매칭 그룹 2</Text>
      </View>
      <View style={styles.line} />
      <View
        style={{
          marginTop: 20,
          width: '100%',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <View>
          {numberOfItemLines.map((item, index) => (
            <Item key={index} name="이름" onPressModalOpen={() => {}} />
          ))}
        </View>
        {numberOfItemLines.map((item, index) => (
          <View
            key={index}
            style={[
              styles.lineBetween,
              {marginTop: lineBetweenOffset + lineBetweenHeight * index},
            ]}
          />
        ))}
        <View>
          {numberOfItemLines.map((item, index) => (
            <Item key={index} name="이름" onPressModalOpen={() => {}} />
          ))}
        </View>
      </View>
    </View>
  );
}

const lineWidthRatio = 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  line: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: palette._d9,
    width: `${layout.widthSystem * 100}%`,
    justifyContent: 'center',
  },
  lineBetween: {
    marginTop: 24,
    borderTopWidth: 3,
    borderColor: palette._7,
    width: `${lineWidthRatio * 100}%`,
    justifyContent: 'center',
    position: 'absolute',
    left: `${0.5 * (1 - lineWidthRatio) * 100}%`,
  },
  item: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default OutputScreen;
