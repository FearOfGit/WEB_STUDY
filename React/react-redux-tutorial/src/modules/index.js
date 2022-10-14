import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

// 하나의 리듀서 함수로 합쳐주기
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
