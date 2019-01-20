import includes from 'lodash.includes';
import React, { createContext, useContext, Component } from 'react';
import styled from 'styled-components';

interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string) => void;
}

interface CheckboxGroupInputProps {
  value: string;
  label: string;
}

const CheckboxGroupWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  grid-gap: 6px;
  user-select: none;
  border: none;
  border-radius: 5px;
`;

const CheckboxGroupItemWrapper = styled.div`
  margin-top: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Context = createContext({});

const CheckboxGroupInput = ({ value, label }: CheckboxGroupInputProps) => {
  const RadioContext = useContext(Context);
  const { state, onChange } = RadioContext;

  return (
    <CheckboxGroupItemWrapper>
      <input
        id={value}
        name={value}
        type="checkbox"
        onChange={onChange}
        checked={includes(state.contextValue, value)}
        value={value}
      />
      <label htmlFor={value}>{label || value}</label>
    </CheckboxGroupItemWrapper>
  );
};

class CheckboxGroup extends Component<CheckboxGroupProps> {
  public static Input = CheckboxGroupInput;

  public render() {
    const { value, onChange, children } = this.props;

    return (
      <Context.Provider
        value={{
          state: {
            contextValue: value,
          },
          onChange: (event: React.FormEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value),
        }}
      >
        <CheckboxGroupWrapper>{children}</CheckboxGroupWrapper>
      </Context.Provider>
    );
  }
}

export default CheckboxGroup;
