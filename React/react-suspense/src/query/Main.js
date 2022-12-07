import { Suspense } from 'react';
import User from './User';

function Main() {
  return (
    <main>
      <Suspense fallback={<p>사용자 정보 로딩중...</p>}>
        <User userId="1" />
      </Suspense>
    </main>
  );
}

export default Main;
