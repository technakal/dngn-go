import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

import './styles/base.css';
import './styles/layout.css';
import './styles/modules.css';
import './styles/state.css';
import './styles/theme.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
registerServiceWorker();
