import createRootlessState from '../../src';

const initialState = {
  loading: false,
  on: ''
};

const actions = {
  toggle(rootless, next) {
    const current = rootless.getState().on;
    if (next === current) {
      rootless.setState({ on: '' });
      return;
    }
    rootless.setState({ on: next });
  },
  startLoading(rootless) {
    rootless.setState({ loading: true });
  },
  stopLoading(rootless) {
    rootless.setState({ loading: false });
  },
  delayedToggle(rootless, next) {
    rootless.actions.startLoading();
    return new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
      rootless.actions.toggle(next);
      rootless.actions.stopLoading();
    });
  }
};

export default createRootlessState({ initialState, actions });
