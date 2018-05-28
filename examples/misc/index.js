import React from 'react';
import ReactDOM from 'react-dom';
import A from './a';
import B from './b';
import C from './c';
import Loading from './loading';

class App extends React.Component {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ marginBottom: '2em' }}>
          <A />
        </div>
        <div style={{ marginBottom: '2em' }}>
          <B />
        </div>
        <div style={{ marginBottom: '2em' }}>
          <C />
        </div>
        <Loading />
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<App />, container);
