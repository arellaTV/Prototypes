import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

document.addEventListener("DOMContentLoaded", function(event) {
  const PIXI = window.PIXI;
  PIXI.settings.SCALE_MODE = 1;
});
