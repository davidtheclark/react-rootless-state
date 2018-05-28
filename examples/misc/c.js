import React from 'react';
import demoState from './demo-state';

class C extends React.Component {
  constructor(props) {
    super(props);
    this.delayedToggleMe = this.delayedToggleMe.bind(this);
  }
  delayedToggleMe() {
    this.props.delayedToggle('C');
  };

  render() {
    const stateMessage = this.props.on ? 'ON' : 'OFF';
    return (
      <div>
        C is {stateMessage}
        <button onClick={this.delayedToggleMe} style={{ marginLeft: '1em' }}>
          Toggle C async
        </button>
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    on: state.on === 'C',
    delayedToggle: actions.delayedToggle
  };
}

export default demoState.connect(selectProps)(C);
