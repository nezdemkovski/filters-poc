import filter from 'lodash.filter';
import includes from 'lodash.includes';
import React, { Component, Fragment } from 'react';

import '../src/App.css';
import CheckboxGroup from '../src/CheckboxGroup';

interface State {
  value: string;
  valueSecond: string;
  continents: string[];
}

class App extends Component<{}, State> {
  public state = {
    value: null,
    valueSecond: null,
    continents: ['north-america'],
  };

  public onChangeFirst = (value: string) => {
    this.setState(prevState => {
      if (prevState.value === value) {
        return {
          value: null,
        };
      }

      return {
        value,
      };
    });
  };

  public onChangeSecond = (value: string) => {
    this.setState(prevState => {
      if (prevState.valueSecond !== value) {
        return {
          valueSecond: value,
        };
      }
    });
  };

  public onChangeContinents = (value: string[]) => {
    console.log({ value });
    this.setState((prevState: State) => ({
      continents: includes(prevState.continents, value)
        ? filter(prevState.continents, item => item !== value)
        : [...prevState.continents, value],
    }));
  };

  public render() {
    console.log(this.state);
    return (
      <Fragment>
        <h5>Value First: {this.state.value}</h5>
        <CheckboxGroup
          type="radio"
          onChange={this.onChangeFirst}
          value={this.state.value}
        >
          <CheckboxGroup.Option label="First" value="first" />
          <CheckboxGroup.Option label="Second" value="second" />
          <CheckboxGroup.Option label="Third" value="third" />
        </CheckboxGroup>

        <h5>Value Second: {this.state.valueSecond}</h5>
        <CheckboxGroup
          type="radio"
          onChange={this.onChangeSecond}
          value={this.state.valueSecond}
        >
          <CheckboxGroup.Option label="A" value="a" />
          <CheckboxGroup.Option label="B" value="b" />
          <CheckboxGroup.Option label="C" value="c" />
        </CheckboxGroup>

        <h5>Value Third: {this.state.continents.join()}</h5>
        <CheckboxGroup
          type="checkbox"
          groupName="continents"
          value={this.state.continents}
          elementsPerRow={4}
          onChange={this.onChangeContinents}
        >
          <CheckboxGroup.Option
            label="🌎 North America"
            value="north-america"
          />
          <CheckboxGroup.Option
            label="☀️ Latin America"
            value="latin-america"
          />
          <CheckboxGroup.Option label="🇪🇺 Europe" value="europe" />
          <CheckboxGroup.Option label="🌍 Africa" value="africa" />
          <CheckboxGroup.Option label="🕌 Middle East" value="middle-east" />
          <CheckboxGroup.Option label="⛩ Asia" value="asia" />
          <CheckboxGroup.Option label="🏄 Oceania" value="oceania" />
          <CheckboxGroup.Option label="🖥 Online" value="online" />
        </CheckboxGroup>
      </Fragment>
    );
  }
}

export default App;
