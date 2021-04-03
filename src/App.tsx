import React from 'react';
import Route from './routes';
import './App.css';

import AppProvider from './hooks';

const App: React.FC = () => (
	<AppProvider>
		<Route />
	</AppProvider>
);

export default App;
