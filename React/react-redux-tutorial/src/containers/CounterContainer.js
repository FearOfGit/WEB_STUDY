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
