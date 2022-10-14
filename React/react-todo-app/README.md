# Todo - app

## node-sass 충돌

- 에러 발생

```
./src/components/TodoTemplate.scss (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/components/TodoTemplate.scss)
Node Sass version 6.0.1 is incompatible with ^4.0.0 || ^5.0.0.
```

- 해결

```
yarn add node-sass@4.14.0
```

## react-icons 라이브러리

- https://react-icons.github.io/react-icons/icons?name=md

- 기본 사용법

```js
import { IconName } from 'react-icons/md';
```

## 색상 내장 함수

- darken 함수

```
button {
  $color: #868e96;
  background: none;
  border: none;
  outline: none;
  background-color: $color;
  color: #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color ease-in;

  &:hover {
    background-color: darken($color, 10%);
  }
}
```

## classnames 라이브러리

- import

```jsx
import cn from 'classnames';

<div className={cn('classname', { checked })}></div>;
```

## 컴포넌트의 리랜더링

- 부모 컴포넌트 리랜더링

- props 변경

- state 변경

- forceUpdate 함수 실행

## React.memo 함수

- 컴포넌트의 props가 변경되지 않으면 리랜더링하지 않도록 설정

## react-virtualized 라이브러리

- https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md
