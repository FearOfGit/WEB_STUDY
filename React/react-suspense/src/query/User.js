import { Suspense } from 'react';
import Posts from './Posts';
import { useQuery } from 'react-query';

function User({ userId }) {
  const { data: user } = useQuery(
    'getUser',
    () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (res) => res.json()
      ),
    {
      suspense: true,
    }
  );
  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
      {/* <Suspense fallback={<p>글목록 로딩중...</p>}>
        <Posts />
      </Suspense> */}
    </div>
  );
}

export default User;
