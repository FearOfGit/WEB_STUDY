import React from 'react';
import { ColorConsumer } from '../contexts/color';

export default function ColorBox() {
  return (
    <ColorConsumer>
      {(value) => (
        <>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: value.colorState.color,
            }}
          />
          <div
            style={{
              width: '32px',
              height: '32px',
              background: value.colorState.subColor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
}
