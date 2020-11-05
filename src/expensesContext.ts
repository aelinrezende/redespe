import React from 'react';
export interface Accounts {
  id: string;
  label: string;
  data: Array<ExpensesInt>
}

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
  installment: {
    status: boolean,
    reference?: number
  }
}

const ExpensesContext = React.createContext<(Array<Accounts>|Function)[]>([[], () => {}]);

export default ExpensesContext;