import React, { useState } from 'react';
import Route from './routes'
import './App.css';

import ExpensesContext from './expensesContext';

import data from './data.json';

function App() {
  const expenses = useState(data);
  
  return (
    <ExpensesContext.Provider value={expenses}>
      <Route/>
    </ExpensesContext.Provider>
  );
}

export default App;
