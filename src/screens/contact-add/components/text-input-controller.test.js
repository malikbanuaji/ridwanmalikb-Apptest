import * as React from 'react';

import {render} from '@testing-library/react-native';
import TextInputController from './text-input-controller';

jest.mock('./form-text-input', () => 'FormTextInput');

test('should render properly', () => {
  const props = {
    control: 'control',
    errors: {firstName: 'firstName'},
    name: 'firstName',
    rules: {},
    label: 'label',
    placeholder: 'placeholder',
    keyboardType: undefined,
  };
  const component = render(<TextInputController {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly with error', () => {
  const props = {
    control: 'control',
    errors: {firstName: 'firstName'},
    name: 'lastName',
    rules: {},
    label: 'label',
    placeholder: 'placeholder',
    keyboardType: undefined,
  };
  const component = render(<TextInputController {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});
