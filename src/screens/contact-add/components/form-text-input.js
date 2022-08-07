import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../theme/colors';
import fontSize from '../../../typography/fontSize';
import {Text, TextInput} from 'react-native';

export const FormTextInput = ({
  onBlur,
  onChangeText,
  value,
  label,
  placeholder,
  isError,
  keyboardType,
}) => {
  const borderStyle = useMemo(
    () => (isError ? styles.textInputError : {}),
    [isError],
  );
  return (
    <View>
      <Text style={{color: colors.grey, fontSize: fontSize.small}}>
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        style={{...styles.textInput, ...borderStyle}}
        placeholder={placeholder}
        placeholderTextColor={'#6c757a'}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
  textInputError: {
    borderBottomColor: colors.high,
  },
  textInput: {
    fontSize: fontSize.normal,
    paddingHorizontal: 0,
    paddingVertical: 5,
    color: colors.white,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
});
