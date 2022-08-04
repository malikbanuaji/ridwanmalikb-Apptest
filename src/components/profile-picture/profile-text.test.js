import * as React from 'react';
import ProfileText from './profile-text';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const component = render(<ProfileText firstName="" lastName="" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly wiht names', () => {
  const component = render(
    <ProfileText firstName="Malik" lastName="Banuaji" />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
