import React from 'react';
import {TouchableHighlight} from 'react-native';

const Pressable = ({onPress, onLongPress, children, disabled}) => {
  return (
    <TouchableHighlight
      disabled={disabled}
      activeOpacity={1}
      underlayColor={'rgba(255,255,255,0.1)'}
      onPress={onPress}
      onLongPress={onLongPress}>
      {children}
    </TouchableHighlight>
  );
};

export default Pressable;
