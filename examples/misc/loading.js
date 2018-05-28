import React from 'react';
import demoState from './demo-state';

class Loading extends React.Component {
  render() {
    if (!this.props.active) return null;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1em',
          background: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 'bold'
        }}
      >
        Waiting ...
      </div>
    );
  }
}

function selectProps(state) {
  return {
    active: state.loading
  };
}

export default demoState.connect(selectProps)(Loading);
