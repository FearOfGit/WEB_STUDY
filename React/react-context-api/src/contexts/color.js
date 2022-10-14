import { createContext, useReducer } from 'react';

const ColorContext = createContext();

const initialState = {
  color: 'black',
  subColor: 'red',
};

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'changeColor':
      return { ...state, color: action.text };
    case 'changeSubColor':
      return { ...state, subColor: action.text };
    default:
      break;
  }
};

const ColorProvider = ({ children }) => {
  const [colorState, dispatch] = useReducer(colorReducer, initialState);

  const value = {
    colorState,
    dispatch,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
