import {contactAPI} from '../../../api/client';
import useContactAdd from './useContactAdd';
import {renderHook} from '@testing-library/react-hooks';
import {waitFor} from '@testing-library/react-native';

describe('useContactAddress', () => {
  const reset = jest.fn();
  const setValue = jest.fn();
  const navigationType = 'view';
  const userId = '1';

  const response = {
    data: {
      data: {
        firstName: 'Malik',
        lastName: 'Banuaji',
        age: 100,
        photo: 'N/A',
        id: '123',
      },
    },
  };

  beforeEach(() => {
    jest
      .spyOn(contactAPI, 'getContact')
      .mockImplementationOnce(() => Promise.resolve(response));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should behave properly', async () => {
    let {result} = renderHook(() =>
      useContactAdd({
        reset,
        setValue,
        navigationType,
        userId,
      }),
    );

    await waitFor(() => {
      expect(reset).toBeCalledWith({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        photo: response.data.data.photo,
      });
      expect(setValue).toBeCalledWith('age', `${response.data.data.age}`, {
        shouldValidate: true,
      });
      expect(result.current.contactDetailLoading).toBe(false);
    });
  });

  test('should not run query', async () => {
    renderHook(() =>
      useContactAdd({
        reset,
        setValue,
        navigationType: 'add',
        userId,
      }),
    );

    await waitFor(() => {
      expect(reset).not.toBeCalled();
      expect(setValue).not.toBeCalled();
    });
  });
});
