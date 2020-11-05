import React, { useState } from 'react';
import Route from './routes'
import './App.css';

import ExpensesContext from './expensesContext';
import CurrentAccountContext from './currentAccountContext';

import data from './data.json';

function App() {
  const expenses = useState(data);
  const current = useState(expenses[0][0].id);
  
  return (
    <ExpensesContext.Provider value={expenses}>
      <CurrentAccountContext.Provider value={current}>
        <Route/>
      </CurrentAccountContext.Provider>
    </ExpensesContext.Provider>
  );
}

export default App;
