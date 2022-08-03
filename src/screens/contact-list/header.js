import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable} from '../../components';
import colors from '../../theme/colors';

const Header = ({onPressAdd}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Contact</Text>
      </View>
      <View>
        <Pressable onPress={onPressAdd}>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={24} color={colors.white} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default Header;
