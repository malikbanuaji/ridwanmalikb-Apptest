import * as React from 'react';

import {render} from '@testing-library/react-native';
import AlertModal from './alert-modal';

jest.mock('react-native-modal');

test('should render properly', () => {
  const Content = 'Content';
  const component = render(
    <AlertModal isVisible={false}>
      <Content />
    </AlertModal>,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
