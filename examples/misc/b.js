import React from 'react';
import demoState from './demo-state';

class B extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMe = this.toggleMe.bind(this);
  }
  toggleMe() {
    this.props.toggle('B');
  };

  render() {
    const stateMessage = this.props.on ? 'ON' : 'OFF';
    return (
      <div>
        B is {stateMessage}
        <button onClick={this.toggleMe} style={{ marginLeft: '1em' }}>
          Toggle B
        </button>
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    on: state.on === 'B',
    toggle: actions.toggle
  };
}

export default demoState.connect(selectProps)(B);
