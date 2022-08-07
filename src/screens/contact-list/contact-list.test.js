import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ContactList from './contact-list';
import {useDispatch, useSelector} from 'react-redux';

jest.mock('./components/contact-item', () => 'ContactItem');
jest.mock('../../features/contact/contactSlice', () => ({
  fetchAllContact: jest.fn(),
  selectAllContact: jest.fn(),
}));

describe('ContactList', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  test('should render properly', () => {
    useDispatch.mockImplementationOnce(() => param => param);
    useSelector.mockImplementationOnce(() => [
      {
        firstName: 'BBBB',
        lastName: 'AAAA',
        age: 12,
        photo: 'AA',
        id: '41862780-1627-11ed-a529-d51f5403f685',
      },
    ]);
    const component = render(<ContactList {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render properly onRefresh', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementation(() => [
      {
        firstName: 'BBBB',
        lastName: 'AAAA',
        age: 12,
        photo: 'AA',
        id: '41862780-1627-11ed-a529-d51f5403f685',
      },
    ]);
    const component = render(<ContactList {...props} />);
    const list = component.getByTestId('ContactList');
    fireEvent(list, 'refresh');

    expect(dispatch).toBeCalled();
  });

  test('on press contact item', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => [
      {
        firstName: 'BBBB',
        lastName: 'AAAA',
        age: 12,
        photo: 'AA',
        id: '41862780-1627-11ed-a529-d51f5403f685',
      },
    ]);
    const component = render(<ContactList {...props} />);
    const list = component.getByTestId('ContactList');
    const item = list.findByType('ContactItem');
    console.log(item);
    item.props.onPress({id: '1', index: 1});
    expect(props.navigation.navigate).toBeCalled();
  });
});
