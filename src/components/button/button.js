import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Pressable from '../pressable';
import colors from '../../theme/colors';
import fontSize from '../../typography/fontSize';

const Button = ({onPress, title, type, disabled}) => {
  const buttonStyle = useMemo(() => {
    const style = [styles.button];
    if (disabled) {
      style.push({opacity: 0.5});
    }

    switch (type) {
      case 'primary':
        style.push(styles.buttonPrimary);
        break;
      case 'danger':
        style.push(styles.buttonDanger);
        break;
      default:
        style.push(styles.buttonPrimary);
        break;
    }
    return style;
  }, [disabled, type]);

  const titleStyle = useMemo(() => {
    const style = [styles.title];
    switch (type) {
      case 'primary':
        style.push(styles.buttonPrimaryTitle);
        break;
      case 'danger':
        style.push(styles.buttonDangerTitle);
        break;
      default:
        style.push(styles.buttonDangerTitle);
        break;
    }
    return style;
  }, [type]);

  return (
    <View style={buttonStyle}>
      <Pressable disabled={disabled} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={titleStyle}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

Button.defaultProps = {
  type: 'primary',
  disabled: false,
};

export default Button;

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: fontSize.normal,
    fontWeight: '800',
  },
  button: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonPrimary: {
    backgroundColor: colors.blue,
  },
  buttonPrimaryTitle: {
    color: colors.white,
  },
  buttonDanger: {},
  buttonDangerTitle: {
    color: colors.high,
  },
});
