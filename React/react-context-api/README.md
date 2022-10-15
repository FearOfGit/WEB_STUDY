## 🔎Context API

- React 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능

- 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 스타일(다크 모드 등)

- redux, react-router, styled-components 등의 라이브러리는 **Context API**를 기반으로 구현되어 있다.

- Context API를 사용하면 `props`를 전달할 필요없이 컴포넌트에서 해당 값을 바로 가져올 수 있다

- `Provider` 하위에서 context를 구독하는 모든 컴포넌트는 `value` prop이 변경될 때마다 다시 렌더링된다. (성능 저하)

### ✨createContext

- **Context 생성**

- 파라미터는 있을 수도 있고 없을 수도 있다. (있을 경우 `Provider` 미사용시 Context의 기본 상태를 지정)

```jsx
import { createContext } from 'react';

const ColorContext = createContext({ color: 'black' });

export default ColorContext;
```

### ✨Consumer

- **전역 데이터 가져오기**

- `value`가 전역 데이터에 해당된다.

```jsx
import ColorContext from '../contexts/color';

<ColorContext.Consumer>
  {(value) => (
    <div
      style={{
        width: '64px',
        height: '64px',
        background: value.color,
      }}
    />
  )}
</ColorContext.Consumer>;
```

### ✨Provider

- 전역 데이터 값을 변경할 수 있다.

- `Provider` 사용시 `value`를 명시해주지 않으면 오류 발생

- `Provider` 내부에 작성된 컴포넌트에서만 전역 데이터에 접근 가능

```jsx
import ColorContext from './contexts/color';

<ColorContext.Provider value={{ color: 'red' }}>
  <div>
    <ColorBox />
  </div>
</ColorContext.Provider>;
```

### ✨동적 Context

- **함수**를 전역 데이터로 전달할 수도 있다.

- Context를 동적으로 변경할 수 있다.

```jsx
// color.js

import { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubColor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subColor, setSubColor] = useState('red');

  const value = {
    state: { color, subColor },
    actions: { setColor, setSubColor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
```

### ✨useContext Hook 사용

- React에서 기본적으로 제공해주는 Hook

- `Consumer` 대신 사용할 수 있다.

```jsx
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default function SelectColor() {
  const value = useContext(ColorContext);

  return (
    <div>
      <h2>색상 선택</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={() => value.actions.setColor(color)}
            onContextMenu={(e) => {
              e.preventDefault();
              value.actions.setSubColor(color);
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
}
```

### ✨useReducer 사용

- `useState` 대신 `useReducer` 사용해보기

```jsx
import { createContext, useReducer } from 'react';

const ColorContext = createContext();

const initialState = {
  color: 'black',
  subColor: 'red',
};

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'changeColor':
      return { ...state, color: action.text };
    case 'changeSubColor':
      return { ...state, subColor: action.text };
    default:
      break;
  }
};

const ColorProvider = ({ children }) => {
  const [colorState, dispatch] = useReducer(colorReducer, initialState);

  const value = {
    colorState,
    dispatch,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
```
