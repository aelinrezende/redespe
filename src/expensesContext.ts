import React from 'react';

export interface ExpensesInt {
  provider: string;
  label: string;
  logo: string;
  bills: Array<BillsInt>;
}

export interface BillsInt {
  expire: string;
  reference: string;
  value: number;
}

const ExpensesContext = React.createContext<(Array<ExpensesInt>|Function)[]>([[], () => {}]);

export default ExpensesContext;