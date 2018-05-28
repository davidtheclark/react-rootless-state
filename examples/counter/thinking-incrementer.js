import React from 'react';
import counterState from './counter-state';

class ThinkingIncrementer extends React.Component {
  constructor(props) {
    super(props);
    this.addOneAfterThinking = this.addOneAfterThinking.bind(this);
  }

  addOneAfterThinking() {
    this.props.incrementAfterThinking(1);
  }

  renderBody() {
    if (this.props.thinking) {
      return 'Thinking ...';
    }

    return (
      <div>
        <p>Count: {this.props.count}</p>
        <button onClick={this.addOneAfterThinking}>increment</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>ThinkingIncrementer</h2>
        {this.renderBody()}
      </div>
    );
  }
}

function selectProps(state, actions) {
  return {
    count: state.count,
    thinking: state.thinking,
    incrementAfterThinking: actions.incrementAfterThinking
  };
}

export default counterState.connect(selectProps)(ThinkingIncrementer);
