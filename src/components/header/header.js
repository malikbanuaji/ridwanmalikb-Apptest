import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable} from '../../components';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import fontSize from '../../typography/fontSize';

const Header = ({title, rightElement, canGoBack}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Pressable>
          <Icon
            style={styles.backButtonIcon}
            size={20}
            name="left"
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      ) : null}
      <View style={[styles.textContainer, {marginLeft: canGoBack ? 0 : 10}]}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View>{typeof rightElement === 'function' && rightElement()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonIcon: {
    padding: 15
  },
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.chat,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default Header;
