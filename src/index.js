import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter , Route} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginScreen from './module/partnerSignin/view';

ReactDOM.render(
<BrowserRouter>
   <App></App>
</BrowserRouter> ,
document.getElementById('root'));
registerServiceWorker();
