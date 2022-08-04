import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Pressable} from '../../components';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, rightElement, canGoBack}) => {
  const navigation = useNavigation();

  const titleContainerStyle = useMemo(() => {
    let marginLeft = 10;
    if (canGoBack) {
      marginLeft = 0;
    }
    return {
      ...styles.textContainer,
      marginLeft,
    };
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Pressable>
          <Icon
            testID="HeaderIcon"
            style={styles.backButtonIcon}
            size={20}
            name="left"
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      ) : null}
      <View style={titleContainerStyle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View>{typeof rightElement === 'function' && rightElement()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonIcon: {
    padding: 15,
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
