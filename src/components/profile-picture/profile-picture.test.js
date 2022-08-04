import * as React from 'react';
import ProfilePicture from './profile-picture';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const component = render(<ProfilePicture photoUri="file://uri" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly without photos', () => {
  const component = render(<ProfilePicture photoUri="N/A" />);
  expect(component.toJSON()).toMatchSnapshot();
});
