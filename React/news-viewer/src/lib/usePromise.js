// Custom Hooks

import { useReducer, useEffect } from 'react';

const initialState = {
  loading: false,
  resolved: null,
  error: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  if (type === 'load') {
    return {
      ...state,
      loading: !state.loading,
    };
  } else if (type === 'data') {
    return {
      ...state,
      resolved: payload,
    };
  } else if (type === 'err') {
    return {
      ...state,
      error: payload,
    };
  }

  return state;
}

export default function usePromise(promiseCreator, deps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const process = async () => {
      dispatch({ type: 'load' });
      try {
        const resolved = await promiseCreator();
        dispatch({ type: 'data', payload: resolved });
      } catch (e) {
        dispatch({ type: 'err', payload: e });
      }
      dispatch({ type: 'load' });
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const { loading, resolved, error } = state;

  return [loading, resolved, error];
}
