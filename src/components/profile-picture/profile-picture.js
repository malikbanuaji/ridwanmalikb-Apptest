import React from 'react';
import {Image, View} from 'react-native';

import colors from '../../theme/colors';

const ProfilePicture = ({photoUri, size}) => {
  const style = {
    borderRadius: 8,
    width: size,
    height: size,
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

ProfilePicture.defaultProps = {
  size: 42,
};

export default ProfilePicture;
