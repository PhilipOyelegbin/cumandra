import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import loginSlice from './slices/loginSlice';
import ScrollToTop from './components/ScrollToTop'
import App from './App'
import './index.css'
import 'animate.css';

// const store = configureStore({
//   reducer: {
//     login: loginSlice,
//   },
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
)
