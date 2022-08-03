import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ProfilePicture} from '../../components';
import colors from '../../theme/colors';
import fontSize from '../../typography/fontSize';

const _renderActionItem = ({label, onPress}, index) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={1}
      style={styles.itemButton}
      underlayColor={'rgba(255,255,255,0.1)'}>
      <Text style={styles.itemText}>{label}</Text>
    </TouchableHighlight>
  );
};

const ModalContent = ({data, actions}) => {
  if (data) {
    return (
      <View style={styles.modalContent}>
        <View>
          <View style={styles.profilePicture}>
            <ProfilePicture size={100} photoUri={data.photo} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {data.firstName} {data.lastName}
            </Text>
          </View>
          <View style={styles.ageContainer}>
            <Text style={styles.ageText}>{`${data.age} year(s) old`}</Text>
          </View>
        </View>
        <View style={styles.actionItemContainer}>
          {actions.map((action, index) => {
            const marginBottom = index + 1 < actions.length ? 5 : 0;
            return (
              <View key={action.key} style={{marginBottom}}>
                {_renderActionItem(action)}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  itemButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  itemText: {
    textAlign: 'left',
    fontSize: fontSize.normal,
    fontWeight: '600',
    color: colors.white,
  },
  modalContent: {
    borderRadius: 8,
    backgroundColor: colors.channels,
    padding: 20,
  },
  profilePicture: {
    marginRight: 10,
  },
  nameContainer: {
    marginTop: 10,
  },
  nameText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: '800',
    letterSpacing: 1,
  },
  ageContainer: {
    marginTop: 2,
  },
  ageText: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  actionItemContainer: {
    marginTop: 10,
    backgroundColor: colors.chat,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ModalContent;
