import React from 'react';
import { Router } from 'react-router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import history from './session-history.jsx';

import Root from './root';

function App() {
  return (
    <div className="App flex horizontal-center vertical-center">    
      <Router history={history}>
        <ToastContainer position='top-right' autoClose={2000} />
        <Root />
      </Router>
    </div>
  );
}

export default App;