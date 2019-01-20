import filter from 'lodash.filter';
import includes from 'lodash.includes';
import React, { Component, Fragment } from 'react';

import '../src/App.css';
import CheckboxGroup from '../src/CheckboxGroup';
import RadioGroup from '../src/RadioGroup';

interface State {
  value: string;
  valueSecond: string;
  continents: string[];
}

class App extends Component<{}, State> {
  public state = {
    value: 'second',
    valueSecond: 'c',
    continents: ['north-america'],
  };

  public onChangeFirst = (value: string) => {
    this.setState({
      value,
    });
  };

  public onChangeSecond = (value: string) => {
    this.setState({
      valueSecond: value,
    });
  };

  public onChangeContinents = (value: string[]) => {
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
        <RadioGroup onChange={this.onChangeFirst} value={this.state.value}>
          <RadioGroup.Option label="First" value="first" />
          <RadioGroup.Option label="Second" value="second" />
          <RadioGroup.Option label="Third" value="third" />
        </RadioGroup>

        <h5>Value Second: {this.state.valueSecond}</h5>
        <RadioGroup
          onChange={this.onChangeSecond}
          value={this.state.valueSecond}
        >
          <RadioGroup.Option label="A" value="a" />
          <RadioGroup.Option label="B" value="b" />
          <RadioGroup.Option label="C" value="c" />
        </RadioGroup>

        <h5>Value Third: {this.state.continents.join()}</h5>
        <CheckboxGroup
          onChange={this.onChangeContinents}
          value={this.state.continents}
          groupName="continents"
        >
          <CheckboxGroup.Input label="🌎 North America" value="north-america" />
          <CheckboxGroup.Input label="☀️ Latin America" value="latin-america" />
          <CheckboxGroup.Input label="🇪🇺 Europe" value="europe" />
          <CheckboxGroup.Input label="🌍 Africa" value="africa" />
          <CheckboxGroup.Input label="🕌 Middle East" value="middle-east" />
          <CheckboxGroup.Input label="⛩ Asia" value="asia" />
          <CheckboxGroup.Input label="🏄 Oceania" value="oceania" />
          <CheckboxGroup.Input label="🖥 Online" value="online" />
        </CheckboxGroup>
      </Fragment>
    );
  }
}

export default App;
