import 'pixi.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './Game/settings'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
