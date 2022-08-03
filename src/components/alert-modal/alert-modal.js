import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../theme/colors';

export default function AlertModal({
  children,
  onBackButtonPress,
  onBackdropPress,
  isVisible,
}) {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={200}
      useNativeDriverForBackdrop
      useNativeDriver
      style={styles.modal}
      backdropColor={colors.black}
      backdropOpacity={0.8}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {margin: 0},
});
