import React from 'react';
import cn from 'classnames';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoItem.scss';

const TodoItem = ({ todo, onRemove, onCheck, style }) => {
  const { content, checked, id } = todo;

  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoItem">
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onCheck(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="content">{content}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
