import * as React from 'react';
import Button from './button';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const component = render(<Button title="Test" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly with danger type', () => {
  const component = render(<Button title="Test" type="danger" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render properly with disabled', () => {
  const component = render(
    <Button type="no_type" title="Test" disabled={true} />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
