import React from 'react';

import { ExpenseProvider } from './expense';

const AppProvider: React.FC = ({ children }) => (
  <ExpenseProvider>
    {children}
  </ExpenseProvider>
);

export default AppProvider;
