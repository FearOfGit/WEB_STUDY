import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoItem from './TodoItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onCheck }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoItem
          key={key}
          todo={todo}
          onRemove={onRemove}
          onCheck={onCheck}
          style={style}
        />
      );
    },
    [todos, onRemove, onCheck],
  );
  return (
    <List
      className="TodoList"
      width={512}
      height={342}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
};

export default React.memo(TodoList);
