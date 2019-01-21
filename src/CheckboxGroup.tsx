import includes from 'lodash.includes';
import React, { createContext, useContext, Component } from 'react';

import {
  CheckboxGroupItemLabel,
  CheckboxGroupItemWrapper,
  CheckboxGroupWrapper,
} from './CheckboxGroupStyles';

interface CheckboxGroupProps {
  type: 'checkbox' | 'radio';
  value: string[];
  onChange: (value: string) => void;
}

interface CheckboxGroupInputProps {
  value: string;
  label: string;
  type?: 'checkbox' | 'radio';
}

const Context = createContext({});

const CheckboxGroupInput = ({
  value,
  label,
  type,
}: CheckboxGroupInputProps) => {
  const RadioContext = useContext(Context);
  const { state, onChange } = RadioContext;

  const isChecked =
    type === 'checkbox'
      ? includes(state.contextValue, value)
      : state.contextValue === value;

  return (
    <CheckboxGroupItemWrapper
      data-value={value}
      onClick={onChange}
      checked={isChecked}
    >
      <CheckboxGroupItemLabel>{label || value}</CheckboxGroupItemLabel>
    </CheckboxGroupItemWrapper>
  );
};

class CheckboxGroup extends Component<CheckboxGroupProps> {
  public static Option = CheckboxGroupInput;

  public render() {
    const { type, value, onChange, children } = this.props;

    return (
      <Context.Provider
        value={{
          state: {
            contextValue: value,
          },
          onChange: (event: React.FormEvent<HTMLElement>) =>
            onChange(event.currentTarget.getAttribute('data-value')),
        }}
      >
        <CheckboxGroupWrapper>
          {React.Children.map(children, (child: React.ReactElement<any>) =>
            React.cloneElement(child, {
              type,
            }),
          )}
        </CheckboxGroupWrapper>
      </Context.Provider>
    );
  }
}

export default CheckboxGroup;
