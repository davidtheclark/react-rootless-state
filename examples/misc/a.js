import React from 'react';
import demoState from './demo-state';

class A extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMe = this.toggleMe.bind(this);
  }
  toggleMe() {
    this.props.toggle('A');
  };

  render() {
    const stateMessage = this.props.on ? 'ON' : 'OFF';
    return (
      <div>
        A is {stateMessage}
        <button onClick={this.toggleMe} style={{ marginLeft: '1em' }}>
          Toggle A
        </button>
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    on: state.on === 'A',
    toggle: actions.toggle
  };
}

export default demoState.connect(selectProps)(A);
