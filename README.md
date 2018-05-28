# react-rootless-state

**EXPERIMENT!! PROOF OF CONCEPT!! NOT READY FOR ACTION!!**

## The goal

An API for shareable state that is as small, idiomatic, and simple as possible, can be connected to arbitrary React components, and is open to standard React & Redux optimizations.

"As simple and idiomatic as possible" means that rootless state should work in pretty much the same way as regular React component state.
You define some initial state; and you define some functions that, when triggered, will update that state by invoking `setState()` ( here called "actions").

That means *no ambitious optimizations by default* — but opportunity for them if & when you want them.
You can incorporate the same optimizations that you would for regular component state: things like `shouldComponentUpdate`, immutable data structures, and selector memoization.

It seems to be universally accepted that shareable state like this must rely on React's `context`.
I don't understand why this is taken for granted.
(I must be missing something?)
It means that every `connect`ed component needs a `Provider` ancestor, and this usually seems like an unnecessary formality that does not provide additional protection or clarity.
(Maybe there are some low-level optimizations involved?)

So this state container is "rootless" because it's not part of a React component tree.
You can `connect` it to whatever component you want, wherever it is in whatever tree.

## Usage

Create a rootless state instance by defining its initial state and its actions.

```js
// counter-state.js
import createRootlessState from 'react-rootless-state';

// Define your initial state.
const initialState = {
  count: 0,
  thinking: false
};

// Define your actions.
//
// Every action function is defined with the first
// argument as the rootless state instance, which
// exposes setState, getState, and all the actions.
// When using these action functions after the state
// has been initialized, you do not pass that
// first instance argument.
//
// As an optimization, you could have your state
// use immutable data structures, which would help with
// usage of PureComponent or shouldComponentUpdate in
// your connected components.
const actions = {
  increment(rootless, amount = 1) {
    rootless.setState(state => ({ count: state.count + amount }));
  },
  decrement(rootless, amount = 1) {
    rootless.setState(state => ({ count: state.count - amount }));
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

const counterState = createRootlessState({ initialState, actions });
export default counterState;
```

Connect your rootless state to a component like this: `rootlessState.connect(selectProps)(Component)`.

```js
// incrementer.js
import React from 'react';
import counterState from './counter-state';

class Incrementer extends React.Component {
  constructor(props) {
    super(props);
    this.addOne = this.addOne.bind(this);
  }

  addOne() {
    this.props.increment();
  }

  render() {
    return (
      <div>
        <h2>Incrementer</h2>
        <p>Count: {this.props.count}</p>
        <button onClick={this.addOne}>increment</button>
      </div>
    );
  }
}

// Use the two arguments to determine which props you want to
// inject into your connected component.
//
// You could always write selector functions and memoize them
// if you run into performance problems.
function selectProps(state, actions) {
  return {
    count: state.count,
    increment: actions.increment
  };
}

export default counterState.connect(selectProps)(Incrementer);
```
