import * as React from 'react';

import {render} from '@testing-library/react-native';
import FormTextInput from './form-text-input';

test('should render properly', () => {
  const props = {
    onBlur: jest.fn(),
    onChangeText: jest.fn(),
    value: '',
    label: 'Label',
    placeholder: 'Placeholder',
    isError: false,
    keyboardType: undefined,
  };
  const component = render(<FormTextInput {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly with error', () => {
  const props = {
    onBlur: jest.fn(),
    onChangeText: jest.fn(),
    value: '',
    label: 'Label',
    placeholder: 'Placeholder',
    isError: true,
    keyboardType: undefined,
  };
  const component = render(<FormTextInput {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});
