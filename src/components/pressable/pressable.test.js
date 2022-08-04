import * as React from 'react';
import Pressable from './pressable';

import {render} from '@testing-library/react-native';

test('should render properly', () => {
  const Content = 'Content';

  const component = render(
    <Pressable>
      <Content />
    </Pressable>,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
