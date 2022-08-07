import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ContactItem from './contact-item';

jest.mock('../../../components');

describe('ContactItem', () => {
  const props = {
    onPress: jest.fn(),
    onLongPress: jest.fn(),
    profilePicture: 'N/A',
    firstName: 'Malik',
    lastName: 'Banuaji',
    id: '1',
    index: 0,
  };

  test('should render properly without profile', () => {
    const component = render(<ContactItem {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render properly with profile', () => {
    const component = render(
      <ContactItem {...props} profilePicture="file://uri" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should handle onPress', () => {
    const component = render(
      <ContactItem {...props} profilePicture="file://uri" />,
    );
    const button = component.getByTestId('ContactItem');
    fireEvent(button, 'press');
    expect(props.onPress).toBeCalled();
  });
});
