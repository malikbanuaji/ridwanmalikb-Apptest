import * as React from 'react';
import Header from './header';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const component = render(<Header title="Contact" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('should render with right element', () => {
  const RightElement = 'RightElement';
  const component = render(
    <Header canGoBack title="Contact" rightElement={() => <RightElement />} />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
