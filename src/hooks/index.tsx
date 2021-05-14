import React from 'react';

import { ExpenseProvider } from './expense';
import { PopupProvider } from './popup';

const AppProvider: React.FC = ({ children }) => (
	<PopupProvider>
		<ExpenseProvider>{children}</ExpenseProvider>
	</PopupProvider>
);

export default AppProvider;
