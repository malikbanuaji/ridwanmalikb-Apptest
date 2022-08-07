import * as React from 'react';

import {render, waitFor, cleanup} from '@testing-library/react-native';
import ContactAdd from './contact-add';
import {Alert, ToastAndroid} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Constants from '../../constants/constants';

import {useForm} from 'react-hook-form';
import {act} from 'react-test-renderer';
import {contactAPI} from '../../api/client';

jest
  .mock('./hooks/useContactAdd', () => jest.fn())
  .mock('./components/text-input-controller', () => 'TextInputController')
  .mock('../../components')
  .mock('react-redux', () => ({
    useDispatch: jest.fn(() => param => param),
  }));

const findByButtonTitle = (jsonComponent = [], title) => {
  if (jsonComponent.type === 'Button' && jsonComponent.props.title === title) {
    return jsonComponent;
  } else {
    const children = jsonComponent.children ? jsonComponent.children : [];

    for (let i = 0; i < children.length; i += 1) {
      const currentChild = jsonComponent.children[i];
      const result = findByButtonTitle(currentChild, title);
      if (result !== false) {
        return result;
      }
    }
    return false;
  }
};

describe('ContactAdd test', () => {
  const navigation = {
    goBack: jest.fn(),
  };
  const useFormMock = {
    watch: () => ({
      firstName: 'malik',
      lastName: 'malik',
    }),
    control: 'control',
    handleSubmit: jest.fn(cb => cb),
    reset: jest.fn(),
    setValue: jest.fn(),
    formState: {errors: {}, isValid: false},
  };

  const toastAndroidShow = jest
    .spyOn(ToastAndroid, 'show')
    .mockReturnValue(undefined);

  beforeEach(() => {
    useForm.mockImplementation(() => useFormMock);
    jest
      .spyOn(contactAPI, 'addContact')
      .mockImplementationOnce(() => Promise.resolve());
    jest
      .spyOn(contactAPI, 'updateContact')
      .mockImplementationOnce(() => Promise.resolve({}));
    jest
      .spyOn(contactAPI, 'deleteContact')
      .mockImplementationOnce(() => Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('should render properly with add type', () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.ADD,
      },
    }));
    const component = render(<ContactAdd navigation={navigation} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render properly with view type', () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.VIEW,
      },
    }));
    const component = render(<ContactAdd navigation={navigation} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render properly with Save Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.VIEW,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const component = render(<ContactAdd navigation={navigation} />);
    const data = {
      firstName: 'First',
    };
    await act(async () =>
      findByButtonTitle(component.toJSON(), 'Save Contact').props.onPress(data),
    );

    await waitFor(async () => {
      expect(contactAPI.updateContact).toBeCalledWith(routeMock.params.id, {
        ...data,
        photo: 'N/A',
      });
    });

    expect(toastAndroidShow).toBeCalled();
  });

  test('should render properly with Add Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.ADD,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const component = render(<ContactAdd navigation={navigation} />);
    const data = {
      firstName: 'First',
    };
    await act(async () =>
      findByButtonTitle(component.toJSON(), 'Add Contact').props.onPress(data),
    );

    await waitFor(async () => {
      expect(contactAPI.addContact).toBeCalledWith({
        ...data,
        photo: 'N/A',
      });
    });

    expect(toastAndroidShow).toBeCalled();
  });

  test('should render properly with Delete Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.VIEW,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const Alertmock = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => jest.fn());

    const component = render(<ContactAdd navigation={navigation} />);

    findByButtonTitle(component.toJSON(), 'Delete Contact').props.onPress();
    expect(Alertmock).toBeCalled();
    await act(async () => Alertmock.mock.calls[0][2][1].onPress());
    await waitFor(async () => {
      expect(contactAPI.deleteContact).toBeCalledWith(routeMock.params.id);
    });

    expect(toastAndroidShow).toBeCalled();
  });
});

describe('ContactAdd test negative', () => {
  const navigation = {
    goBack: jest.fn(),
  };
  const useFormMock = {
    watch: () => ({
      firstName: 'malik',
      lastName: 'malik',
    }),
    control: 'control',
    handleSubmit: jest.fn(cb => cb),
    reset: jest.fn(),
    setValue: jest.fn(),
    formState: {errors: {}, isValid: false},
  };

  const toastAndroidShow = jest
    .spyOn(ToastAndroid, 'show')
    .mockReturnValue(undefined);
    const error = new Error('error');

  const addContactApi = jest
    .spyOn(contactAPI, 'addContact')
    .mockRejectedValueOnce(error);
  jest.spyOn(contactAPI, 'updateContact').mockRejectedValueOnce(error);
  jest.spyOn(contactAPI, 'deleteContact').mockRejectedValueOnce(error);

  beforeEach(() => {
    useForm.mockImplementation(() => useFormMock);

  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('should render properly with Save Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.VIEW,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const component = render(<ContactAdd navigation={navigation} />);
    const data = {
      firstName: 'First',
    };
    await act(async () =>
      findByButtonTitle(component.toJSON(), 'Save Contact').props.onPress(data),
    );

    await waitFor(async () => {
      expect(contactAPI.updateContact).toBeCalledWith(routeMock.params.id, {
        ...data,
        photo: 'N/A',
      });
    });

    expect(toastAndroidShow).toBeCalled();
  });

  test('should render properly with Add Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.ADD,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const component = render(<ContactAdd navigation={navigation} />);
    const data = {
      firstName: 'First',
    };
    await act(async () =>
      findByButtonTitle(component.toJSON(), 'Add Contact').props.onPress(data),
    );

    await waitFor(async () => {
      expect(addContactApi).rejects.toEqual('errorr');
    });

    expect(toastAndroidShow).toBeCalled();
  });

  test('should render properly with Delete Contact', async () => {
    const routeMock = {
      params: {
        id: '1',
        type: Constants.CONTACT_ADD_ACTION_TYPE.VIEW,
      },
    };
    useRoute.mockImplementationOnce(() => routeMock);
    jest.spyOn(React, 'useState').mockImplementationOnce();

    const Alertmock = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => jest.fn());

    const component = render(<ContactAdd navigation={navigation} />);

    findByButtonTitle(component.toJSON(), 'Delete Contact').props.onPress();
    expect(Alertmock).toBeCalled();
    await act(async () => Alertmock.mock.calls[0][2][1].onPress());
    await waitFor(async () => {
      expect(contactAPI.deleteContact).toBeCalledWith(routeMock.params.id);
    });

    expect(toastAndroidShow).toBeCalled();
  });
});
