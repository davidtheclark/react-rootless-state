import React from 'react';
import counterState from './counter-state';

class Incrementer extends React.Component {
  constructor(props) {
    super(props);
    this.addOne = this.addOne.bind(this);
  }

  addOne() {
    this.props.increment();
  }

  render() {
    return (
      <div>
        <h2>Incrementer</h2>
        <p>Count: {this.props.count}</p>
        <button onClick={this.addOne}>increment</button>
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    count: state.count,
    increment: actions.increment
  };
}

export default counterState.connect(selectProps)(Incrementer);
