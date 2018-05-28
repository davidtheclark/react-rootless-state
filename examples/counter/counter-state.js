import createRootlessState from '../../src';

// Define your initial state.
const initialState = {
  count: 0,
  thinking: false
};

// Define your actions.
// Every action function is defined with the first
// argument as the rootless state instance, which
// exposes setState, getState, and actions.
// When using the actions, you do not pass that
// first instance argument.
const actions = {
  increment(rootless, amount = 1) {
    const nextCount = rootless.getState().count + amount;
    rootless.setState({ count: nextCount });
  },
  decrement(rootless, amount = 1) {
    const nextCount = rootless.getState().count - amount;
    rootless.setState({ count: nextCount });
  },
  // The instance argument exposes the other actions,
  // which you can use to create compound actions.
  // You can also do asynchronous things: just call
  // rootless.setState() whenever it's time to update
  // some portion of the state.
  startThinking(rootless) {
    rootless.setState({ thinking: true });
  },
  stopThinking(rootless) {
    rootless.setState({ thinking: false });
  },
  incrementAfterThinking(rootless, amount = 1) {
    rootless.actions.startThinking();
    // Think for 1 second, then update the count.
    setTimeout(() => {
      rootless.actions.stopThinking();
      rootless.actions.increment(amount);
    }, 1000);
  }
};

export default createRootlessState({ initialState, actions });
