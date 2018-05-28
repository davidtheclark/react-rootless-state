import React from 'react';

function extend(...objs) {
  const result = {};
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    const keys = Object.keys(obj);
    for (let ki = 0; ki < keys.length; ki++) {
      const key = keys[ki];
      result[key] = obj[key];
    }
  }
  return result;
}

class BaseWithRootlessState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storeState: props.store.getState() };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(this.handleUpdate);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.handleUpdate);
  }

  handleUpdate() {
    // This state change just triggers a re-render:
    // the state itself is not passed into the WrappedComponent.
    this.setState({ storeState: this.props.store.getState() });
  }

  render() {
    const selectedProps = this.props.selectProps(
      this.props.store.getState(),
      this.props.store.actions
    );
    return React.createElement(
      this.props.WrappedComponent,
      extend(this.props.passedProps, selectedProps)
    );
  }
}

class RootlessState {
  constructor(config) {
    config = config || {};
    this.state = config.initialState || {};
    this.actions = this.curryActions(config.actions || {});
    this.listeners = [];
    this.inActionApi = {
      setState: this.setState.bind(this),
      getState: this.getState.bind(this),
      actions: this.actions
    };
  }

  curryActions(actions) {
    return Object.keys(actions).reduce((memo, name) => {
      memo[name] = (...args) => {
        return actions[name].apply(this, [this.inActionApi].concat(args));
      };
      return memo;
    }, {});
  }

  subscribe(cb) {
    this.listeners.push(cb);
  }

  unsubscribe(cb) {
    this.listeners.splice(this.listeners.indexOf(cb), 1);
  }

  update() {
    this.listeners.forEach(listener => {
      listener();
    });
  }

  setState(updater) {
    if (typeof updater === 'function') {
      this.state = extend(updater(this.getState()));
    } else {
      this.state = extend(this.state, updater);
    }
    this.update();
  }

  getState() {
    return this.state;
  }

  connect(selectProps) {
    const store = this;
    return WrappedComponent => {
      function WithRootlessState(props) {
        return React.createElement(BaseWithRootlessState, {
          store,
          selectProps,
          WrappedComponent,
          passedProps: props
        });
      }
      WithRootlessState.displayName = `WithRootlessState(${WrappedComponent.name ||
        'Component'})`;
      WithRootlessState.WrappedComponent = WrappedComponent;
      return WithRootlessState;
    };
  }
}

function createRootlessState(config) {
  return new RootlessState(config);
}

export default createRootlessState;
