import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Direct selector to the chat state domain
 */
const selectAppDomain = () => (state) => state.get('app');


const makeSelectApp = () => createSelector(
    selectAppDomain(),
    (substate) => substate.toJS()
);

const makeSelectAppPlayerName = () => createSelector(
    selectAppDomain(),
    (substate) => substate.toJS().name
);

export {
  makeSelectLocationState,
  makeSelectApp,
  makeSelectAppPlayerName,
};
