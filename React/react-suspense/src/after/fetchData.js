// render as you fetch 패턴
import {} from 'react-query';
function fetchUser(userId) {
  let user = null;
  const suspender = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        user = data;
      }, 3000);
    });
  return {
    read() {
      if (user === null) {
        throw suspender;
      } else {
        return user;
      }
    },
  };
}

function fetchPosts(userId) {
  let posts = null;
  const suspender = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  )
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        posts = data;
      }, 3000);
    });
  return {
    read() {
      if (posts === null) {
        throw suspender;
      } else {
        return posts;
      }
    },
  };
}

function fetchData(userId) {
  return {
    user: fetchUser(userId),
    posts: fetchPosts(userId),
  };
}

export default fetchData;
