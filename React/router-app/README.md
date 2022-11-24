## Global Pending UI

- 리액트 라우터는 다음 페이지에 대한 데이터가 로드되는 동안 이전 페이지를 그대로 유지한다.
- 사용자에게 데이터가 로드되는 중이라는 피드백(스피너, 로딩바 등)을 주자
- useNavigation Hook
- navigation.state : 현재 navigation state를 반환(idle | submitting | loading)
- 추가적으로 이미 방문한 아이템에 대해서는 캐싱해놓는 것이 좋다.

```jsx
import {
  //...
  useNavigation,
} from 'react-router-dom';

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      //...
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
```

## Deleting Records

- `Form`의 action 속성의 역할 : 해당 경로로 이동
- `action='destroy'`, contact/:contactId/destroy
- 삭제를 위한 라우터 추가 및 action 추가

```jsx
import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect('/');
}

const router = createBrowserRouter([
  {
    // ...
    children: [
      // ...
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
      },
    ],
  },
]);
```

> ### 흐름 이해하기
>
> 1. `<Form>`은 서버에 POST 요청을 보내는 브라우저의 기본 동작을 막고 클라이언트 측 라우팅으로 POST 요청을 생성한다.
> 2. action 속성에 해당하는 클라이언트 측 라우팅에 요청을 보낸다.
> 3. action의 리다이렉트 이후, 리액트 라우터는 페이지의 모든 로더를 실행하여 값을 업데이터한다. (revalidation)

## Contextual Errors

- 문제가 없는 페이지 부분과 계속 상호 작용할 수 있다.
- `errorElement`는 가장 가까운 곳까지 버블링된다.

```jsx
// 삭제시 무조건 에러가 발생하게 구현
export async function action({ params }) {
  throw new Error('oh dang!');
}

const router = createBrowserRouter([
  {
    // ...
    children: [
      // ...
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);
```

## Index Routes

- 현재 앱은 로드하면 목록 오른쪽에 큰 빈 페이지가 표시된다.
- 현재 경로 일치하는 자식 경로가 없기 때문에 `<Outlet>`은 렌더링할 페이지가 없다.
- 기본 자식 라우트인 인덱스 라우트를 통해 그 공간을 채울 수 있다.

```jsx
export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{' '}
      <a href="https://reactrouter.com/">the docs at reactrouter.com</a>.
    </p>
  );
}

const router = createBrowserRouter([
  {
    children: [
      { index: true, element: <Index /> },
      //...
    ],
  },
]);
```

## Cancel Button

- `useNavigate`
- 특정 페이지 이동, 뒤로 가기 등 브라우저의 history 기능 수행

```jsx
import { useNavigate } from 'react-router-dom';

export default function EditContact() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      //...
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
```

## URL Search Params and GET Submissions

- `<form>`(not react router)의 기본 method는 GET
- 요청을 생성할 때 데이터를 GET 요청의 URLSearchParams에 넣는다.

```jsx
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            //...
          </form>
          //...
      </div>
    </>
  );
}
```

## GET Submissions with Client Side Routing

- react router의 `<Form>` 사용
- 리액트 라우터는 action을 호출하지 않았다.
- GET form은 링크를 클릭하는 것과 동일하며 URL만 변경된다.
- 이것이 필터링을 위한 코드가 action이 아닌 loader에 있는 이유이다.

```jsx
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts };
}
```

## Synchronizing URLs to Form State

- 몇 가지 UX 문제가 존재한다.
  > 1.  뒤로 가기 수행 후 필터링이 해제된 상태에서 input에 검색한 단어가 남아있다.
  > 2.  새로고침하면 필터링된 상태에서 input이 빈 상태가 된다.
- 즉, URL과 form 상태가 out of sync

### 1번 문제 해결

```jsx
import { useEffect } from 'react';

useEffect(() => {
  document.getElementById('q').value = q;
}, [q]);
```

### 2번 문제 해결

```jsx
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();

  return (
    <>
      <div id="sidebar">
        //...
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          //...
        </div>
        //...
      </div>
      //...
    </>
  );
}
```

## Submitting Forms 'onChange'

- `useSubmit` 사용
- `currentTarget` : Form를 의미

```jsx
import { useSubmit } from 'react-router-dom';

export default function Root() {
  const submit = useSubmit();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            //...
          </Form>
          //...
        </div>
      </div>
      //...
    </>
  );
}
```

## Adding Search Spinner

- 더 나은 UX를 위해 검색에 대한 즉각적인 UI 피드백 추가
- `useNavigation` 사용
- `useNavigation.location`은 앱이 새 URL로 이동하고 해당 데이터를 로드할 때 표시된다.
- 그리고 로드가 완료되면 사라진다.

```jsx
export default function Root() {
  //...

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  //...

  return (
    <>
      <div id="sidebar">
        //...
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              //...
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            //...
          </Form>
          //...
        </div>
        //...
      </div>
      //...
    </>
  );
}
```

## Managing the History Stack

- 현재 모든 키 입력에 대해 form이 제출되므로 스택에 많은 양이 쌓이게 된다.
- 히스토리 스택에 push가 아닌 replace를 통해 이를 해결할 수 있다.
- 단, 가장 첫번째 페이지는 push 해야 한다.

```jsx
export default function Root() {
  //...

  return (
    <>
      <div id="sidebar">
        //...
        <div>
          <Form id="search-form" role="search">
            <input
              //...
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            //...
          </Form>
          //...
        </div>
        //...
      </div>
      //...
    </>
  );
}
```
