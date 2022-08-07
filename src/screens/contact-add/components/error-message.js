import React from 'react';
import {StyleSheet, Text} from 'react-native';
import fontSize from '../../../typography/fontSize';

const ErrorMessage = ({name, errors}) => {
  return (
    <Text style={styles.errorMessageText}>
      {errors[name] ? errors[name].message : ''}
    </Text>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorMessageText: {
    color: '#ff3800',
    fontSize: fontSize.small,
    letterSpacing: 0.1,
  },
});
