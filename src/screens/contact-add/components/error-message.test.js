import * as React from 'react';
import ErrorMessage from './error-message';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const component = render(
    <ErrorMessage errors={{firstName: 'Error'}} name="firstName" />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render negative case', () => {
  const component = render(<ErrorMessage errors={{}} name="firstName" />);
  expect(component.toJSON()).toMatchSnapshot();
});
