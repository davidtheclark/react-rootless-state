import React from 'react';
import counterState from './counter-state';

class Decrementer extends React.Component {
  constructor(props) {
    super(props);
    this.subtractOne = this.subtractOne.bind(this);
  }

  subtractOne() {
    this.props.decrement(1);
  }

  render() {
    return (
      <div>
        <h2>Decrementer</h2>
        <p>Count: {this.props.count}</p>
        <button onClick={this.subtractOne}>decrement</button>
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    count: state.count,
    decrement: actions.decrement
  };
}

export default counterState.connect(selectProps)(Decrementer);
