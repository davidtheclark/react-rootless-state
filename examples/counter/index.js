import React from 'react';
import ReactDOM from 'react-dom';
import Incrementer from './incrementer';
import Decrementer from './decrementer';
import ThinkingIncrementer from './thinking-incrementer';

class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginBottom: '1em' }}>
          <Incrementer />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <Decrementer />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <ThinkingIncrementer />
        </div>
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<App />, container);
