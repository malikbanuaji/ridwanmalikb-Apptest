import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';

export default function ProfileText({firstName, lastName, size, fontSize}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        ...styles.container,
      }}>
      <Text style={{...styles.text, fontSize}}>
        {firstName?.substring(0, 1).toUpperCase()}
        {lastName?.substring(0, 1).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
    fontWeight: '500',
    color: colors.white,
  },
});
