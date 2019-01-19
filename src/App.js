import React, { Component } from 'react';
import includes from 'lodash.includes';
import filter from 'lodash.filter';

import RadioGroup from './RadioGroup';
import CheckboxGroup from './CheckboxGroup';
import './App.css';

class App extends Component {
  state = {
    value: 'second',
    valueSecond: 'c',
    valueThird: ['north-america'],
  };

  onChangeFirst = value => {
    this.setState({
      value,
    });
  };

  onChangeSecond = value => {
    this.setState({
      valueSecond: value,
    });
  };

  onChangeThird = value => {
    this.setState(prevState => ({
      valueThird: includes(prevState.valueThird, value)
        ? filter(prevState.valueThird, item => item !== value)
        : [...prevState.valueThird, value],
    }));
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
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

        <h5>Value Third: {this.state.valueThird.join()}</h5>
        <CheckboxGroup
          onChange={this.onChangeThird}
          value={this.state.valueThird}
          groupName="continents"
        >
          <CheckboxGroup.Input label="Europe" value="europe" />
          <CheckboxGroup.Input label="Asia" value="asia" />
          <CheckboxGroup.Input label="North America" value="north-america" />
        </CheckboxGroup>
      </React.Fragment>
    );
  }
}

export default App;
