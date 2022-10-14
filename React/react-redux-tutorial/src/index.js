import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// 스토어 생성
const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider 컴포넌트를 통해 하위 컴포넌트로 store 전달
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
