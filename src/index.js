import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'pixi.js';
import './Game'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
