import React, { useState, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  function createTodos() {
    let array = [];

    for (let i = 0; i <= 2500; i++) {
      array.push({
        id: i,
        content: `내용${i}`,
        checked: false,
      });
    }

    return array;
  }

  const [todos, setTodos] = useState(createTodos);

  const nextId = useRef(2501);
  const onInsert = useCallback((content) => {
    const todo = {
      id: nextId.current,
      content,
      checked: false,
    };

    setTodos((todos) => [...todos, todo]);
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onCheck = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onCheck={onCheck} />
    </TodoTemplate>
  );
};

export default App;
