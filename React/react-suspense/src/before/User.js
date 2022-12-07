import { useState, useEffect } from 'react';
import Posts from './Posts';

function User({ userId }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        // 상태를 변경하는 작업을 늦춘다.
        setTimeout(() => {
          setUser(user);
          setLoading(false);
        }, 3000);
      });
  });

  if (loading) return <p>사용자 정보 로딩중...</p>;
  return (
    <div>
      <p>{user.name} 님이 작성한 글</p>
      <Posts userId={userId} />
    </div>
  );
}

export default User;
