import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import mainReducer from "./reducers/RootReducer"
import { Provider } from 'react-redux';
import './mystyle.css'
import './mystyle.scss'
import './css/wave.css'
import './css/style-typing.css'
import './css/style-comment.css'
import './css/style-card.css'
import './css/style-footer.css'
import './css/404.css'
import './css/style-login.css'
import './css/toast.css'

const store = createStore(mainReducer)


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
