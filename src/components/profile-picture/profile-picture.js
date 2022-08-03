import React from 'react';
import {Image, View} from 'react-native';

import colors from '../../theme/colors';

const ProfilePicture = ({photoUri, size}) => {
  const style = {
    borderRadius: 8,
    width: size || 42,
    height: size || 42,
  };
  return (
    <>
      {!photoUri || photoUri === 'N/A' ? (
        <View
          style={{
            ...style,
            backgroundColor: colors.grey,
          }}
        />
      ) : (
        <Image style={style} source={{uri: photoUri}} />
      )}
    </>
  );
};

export default ProfilePicture;
