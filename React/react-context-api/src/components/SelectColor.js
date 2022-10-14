import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default function SelectColor() {
  const { dispatch } = useContext(ColorContext);

  return (
    <div>
      <h2>색상 선택</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={() => dispatch({ type: 'changeColor', text: color })}
            onContextMenu={(e) => {
              e.preventDefault();
              dispatch({ type: 'changeSubColor', text: color });
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
}
