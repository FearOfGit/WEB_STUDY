## 🔎Redux 개념정리

> <https://velog.io/@sanbondeveloper/React-Redux-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC>

<br />

## 🔎React에서 Redux 사용하기

> 리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은 **프레젠테이셔녈 컴포넌트**와 **컨테이너 컴포넌트**를 분리하는 것이다.  
> **프레젠테이셔널 컴포넌트**란 `props`를 받아 와서 화면에 UI를 보여주는 역할을 하는 컴포넌트를 말하고, **컨테이너 컴포넌트**는 리덕스와 연동되어 상태를 받아오고 스토어에 액션을 디스패치하는 컴포넌트를 말한다.  
> 이러한 패턴은 필수 사항은 아니지만, 코드 재사용성과 관심사 분리에 도움을 줄 수 있다.

### ✨설치

```bash
npm i redux react-redux
```

### ✨프레젠테이셔널 컴포넌트 작성

- UI 역할을 한다.

```jsx
import React from 'react';

function Counter({ number, onIncrease, onDecrease }) {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
```

### ✨컨테이너 컴포넌트 작성

- `connect`

- 리덕스와 연동된 컴포넌트

```jsx
import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
// 액션 생성 함수
import { increase, decrease } from '../modules/counter';

function CounterContainer({ number, increase, decrease }) {
  return (
    // 프레젠테이셔널 컴포넌트 렌더링
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
}

const mapStateToProps = (state) => ({
  number: state.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

// 리덕스와 컴포넌트 연동
// connect 함수는 함수를 반환
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

### ✨Redux 모듈 작성

- 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 하나의 파일에 작성하는 방식 사용 (**Ducks 패턴**)

```jsx
// 액션 정의 - '모듈 이름/액션명' 형식을 권장
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수
// dispatch 호출시 사용
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 상태 값
const initialState = {
  number: 0,
};

// 리듀서 함수
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}
```

### ✨루트 리듀서 작성

- `combineReducers` 함수 사용

- `createStore` 함수를 통해 스토어를 생성할 때 하나의 리듀서 함수만 사용할 수 있다.

- 따라서 리듀서 함수가 여러개일 경우 이들을 하나의 리듀서로 합쳐 주어야 한다.

```jsx
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

// 하나의 리듀서 함수로 합쳐주기
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

### ✨스토어 생성

- 리액트 애플리케이션에 리덕스를 실질적으로 적용하는 과정

- 주로 `src/index.js`에서 구현

```jsx
const store = createStore(rootReducer);
```

#### Redux DevTools 적용하기

```jsx
// 일반
const store = createStore(
  rootReducer,
  // 조건부
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// 라이브러리 사용
//  npm i redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());
```

### ✨Provider 컴포넌트

- `react-redux`에서 제공

- Context API와 동일하게 `Provider`로 하위 컴포넌트를 감싸서 `store`의 상태값을 사용할 수 있도록 한다.

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider 컴포넌트를 통해 하위 컴포넌트로 store 전달
  <Provider store={store}>
    <App />
  </Provider>,
);
```

### ✨useSelector와 useDispatch

- Hook을 이용한 방법

- `connect` 방식과 다르게 이 방법의 경우 성능 최적화(부모 컴포넌트 리렌더링에 따른) 이루어지지 않는다.

- 따라서 직접 `React.memo`를 사용해야 한다.

```js
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
// 액션 생성 함수
import { increase, decrease } from '../modules/counter';

function CounterContainer() {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  // 리렌더링 될 때마다 콜백 함수가 재생성되는 것으 방지
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    // 프레젠테이셔널 컴포넌트 렌더링
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default React.memo(CounterContainer);
```

### ✨useStore

- 스토어에 직접 접근하는 방법

```jsx
import { useStore } from 'react-redux';

const store = useStore();
console.log(store.getState());
```
