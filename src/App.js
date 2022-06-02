import React from 'react';
import './App.css';
import './component/styles/reset.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { HashRouter } from 'react-router-dom'
import Navbar from './component/Navbar'
import routes from './routes'
import './component/styles/home.scss';


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        {routes}
      </HashRouter>
    </Provider>
  );
}

export default App;