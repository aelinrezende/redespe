import React from 'react';

import { ExpenseProvider } from './expense';
import { PopupProvider } from './popup';
import { AccountProvider } from './account';

const AppProvider: React.FC = ({ children }) => (
	<PopupProvider>
		<AccountProvider>
			<ExpenseProvider>{children}</ExpenseProvider>
		</AccountProvider>
	</PopupProvider>
);

export default AppProvider;
