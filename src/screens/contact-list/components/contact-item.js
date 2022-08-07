import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import {ProfilePicture, ProfileText} from '../../../components';
import fontSize from '../../../typography/fontSize';

const ContactItem = ({
  onPress,
  onLongPress,
  profilePicture,
  firstName,
  lastName,
  id,
  index,
}) => {
  const _handleOnPress = () => {
    onPress && onPress({id, index});
  };
  return (
    <View>
      <TouchableHighlight
        testID="ContactItem"
        onLongPress={onLongPress}
        activeOpacity={1}
        underlayColor={'rgba(255,255,255,0.1)'}
        style={styles.button}
        onPress={_handleOnPress}>
        <View style={styles.content}>
          <View style={styles.profilePicture}>
            {profilePicture === 'N/A' ? (
              <ProfileText
                fontSize={fontSize.medium}
                firstName={firstName}
                lastName={lastName}
                size={42}
              />
            ) : (
              <ProfilePicture photoUri={profilePicture} />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.textName}>
              {firstName} {lastName}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="right" color={colors.white} size={14} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  content: {flexDirection: 'row', alignItems: 'center'},
  profilePicture: {
    marginRight: 10,
    width: 42,
    height: 42,
    overflow: 'hidden',
  },
  nameContainer: {flex: 1},
  textName: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  iconContainer: {
    marginRight: 5,
  },
});

export default ContactItem;
