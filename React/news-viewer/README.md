# news-viewer

## news API

https://newsapi.org/s/south-korea-news-api

전체 뉴스: https://newsapi.org/v2/top-headlines?country=kr&apiKey=

특정 카테고리 뉴스: https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=

---

<br />

## styled-components

### a태그 중복 속성 설정하기

```js
const UrlA = styled.a.attrs((props) => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: black;
`;
```

<br />

## sampleData

```js
const sampleArticle = {
  title: '제목',
  description: '내용',
  url: 'https://naver.com',
  urlToImage: 'https://via.placeholder.com/160',
  author: 'unknown',
  publishedAt: Date.now(),
};
```

<br />

## CSS 속성

### object-fit

- img나 video 요소와 같은 대체 요소의 콘텐츠 크기를 어떤 방식으로 조절해 요소에 맞출 것인지 지정합니다.
- cover: 대체 콘텐츠의 가로세로비를 유지하면서, 요소 콘텐츠 박스를 가득 채웁니다. 서로의 가로세로비가 일치하지 않으면 객체 일부가 잘려나갑니다.
- https://developer.mozilla.org/ko/docs/Web/CSS/object-fit

### white-space

- 요소가 공백 문자를 처리하는 법을 지정합니다.
- normal: 연속 공백을 하나로 합침, 개행 문자도 다른 공백 문자와 동일하게 처리합니다. 한 줄이 너무 길어서 넘칠 경우 자동으로 줄을 바꿉니다.
- https://developer.mozilla.org/ko/docs/Web/CSS/white-space

<br />

## react-router-dom

### 라우터 설정

```js
import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
```

### NavLink

```js
const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          as={NavLink}
          activeClassName="active"
          exact={c.name === 'all'}
          to={c.name === 'all' ? '/' : `/${c.name}`}
          key={c.name}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};
```

<br />

## 환경 변수

```js
// .env.development, .env.test, .env.production

process.env.REACT_APP_API_KEY;
```

<br />

## Custom Hooks

```js
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
```

<br />

![image](https://user-images.githubusercontent.com/63990390/130591329-c54293fa-0eb9-467d-805f-be5205026c69.png)
