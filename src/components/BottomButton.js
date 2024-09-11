import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import palette from '../styles/colors/colorPalette';

function BottomButton({title, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.bottom}>
      <Text style={{fontSize: 18, color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bottom: {
    width: 312,
    height: 41,
    backgroundColor: palette.primary,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default BottomButton;
