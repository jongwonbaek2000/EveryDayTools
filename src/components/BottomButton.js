import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import palette from '../styles/colors/colorPalette';
import layout from '../styles/layouts/layout';

function BottomButton({title, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.bottom}>
      <Text style={{fontSize: 18, color: 'white', margin: 'auto'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bottom: {
    width: `${layout.widthSystem * 100}%`,
    height: 48,
    backgroundColor: palette.primary,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default BottomButton;
