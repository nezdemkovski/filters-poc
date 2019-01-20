import React, {
  createContext,
  // useState,
  useContext,
  Component,
} from 'react';

const Context = createContext({});

const RadioGroupOption = ({ value, label }) => {
  const RadioContext = useContext(Context);
  const { state, onChange } = RadioContext;

  return (
    <div className="radio-group-item">
      <input
        id={value}
        name={value}
        type="radio"
        onChange={onChange}
        checked={state.contextValue === value}
        value={value}
      />
      <label htmlFor={value}>{label || value}</label>
    </div>
  );
};

class RadioGroup extends Component {
  public static Option = RadioGroupOption;

  public render() {
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
        <fieldset className="radio-group">{children}</fieldset>
      </Context.Provider>
    );
  }
}

export default RadioGroup;
