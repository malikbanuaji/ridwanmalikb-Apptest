import React from 'react';
import {StyleSheet, View} from 'react-native';
import ErrorMessage from './error-message';

import {Controller} from 'react-hook-form';
import FormTextInput from './form-text-input';

const TextInputController = ({
  control,
  errors,
  name,
  rules,
  label,
  placeholder,
  keyboardType,
}) => (
  <View style={styles.textInputControl}>
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <FormTextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          label={label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          isError={errors[name]}
        />
      )}
    />
    <View style={styles.errorMessageContainer}>
      <ErrorMessage name={name} errors={errors} />
    </View>
  </View>
);

export default TextInputController;

const styles = StyleSheet.create({
  errorMessageContainer: {
    marginTop: 4,
  },
  textInputControl: {
    marginTop: 15,
  },
});
