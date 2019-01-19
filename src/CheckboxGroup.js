import React, {
  createContext,
  // useState,
  useContext,
  Component,
} from 'react';
import includes from 'lodash.includes';

const Context = createContext({});

const CheckboxGroupInput = ({ value, label }) => {
  const RadioContext = useContext(Context);
  const { state, onChange } = RadioContext;

  return (
    <div className="checkbox-group-item">
      <input
        id={value}
        name={value}
        type="checkbox"
        onChange={onChange}
        checked={includes(state.contextValue, value)}
        value={value}
      />
      <label htmlFor={value}>{label || value}</label>
    </div>
  );
};

class CheckboxGroup extends Component {
  static Input = CheckboxGroupInput;

  render() {
    const { value, onChange, children } = this.props;

    return (
      <Context.Provider
        value={{
          state: {
            contextValue: value,
          },
          onChange: event => onChange(event.currentTarget.value),
        }}
      >
        <fieldset className="checkbox-group">{children}</fieldset>
      </Context.Provider>
    );
  }
}

export default CheckboxGroup;
