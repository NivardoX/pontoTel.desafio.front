import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/App';
require('dotenv').config();
console.log(process.env)

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
