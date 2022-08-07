import * as React from 'react';

export const useForm = jest.fn();

const ControllerComponent = 'Controller';
export const Controller = props => {
  const {render, ...restProps} = props;
  return (
    <ControllerComponent {...restProps}>
      {render({field: {onChange: jest.fn(), value: jest.fn()}})}
    </ControllerComponent>
  );
};
