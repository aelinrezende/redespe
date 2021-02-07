import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import staticData from '../data.json';

interface ExpenseContextData {
  account: AccountsProps;
  currentAccount: number;
  removeExpense(expenseIndex: number): void;
  removeBill(expenseIndex: number, billIndex: number): void;
  toggleAccount(): void;
  totals: {
    currentAccount: number;
    full: number;
  }
}

export interface AccountsProps {
  id: string;
  label: string;
  data: Array<ExpensesProps>
}

export interface ExpensesProps {
  provider: string;
  label: string;
  logo: string;
  bills: Array<BillsProps>;
}

export interface BillsProps {
  expire: string;
  reference: string;
  value: number;
  installment: {
    status: boolean,
    reference?: number
  }
}

const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData);

const ExpenseProvider: React.FC = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountsProps[]>(staticData);
  const [accountsIDs,] = useState<number[]>(() => {
    const array: number[] = [];
    accounts.forEach((_, i) => {
      array.push(i);
    });
    
    return array;
  });
  const [currentAccount, setCurrentAccount] = useState<number>(0);
  const [totals, setTotals] = useState<{ currentAccount: number, full: number }>({ currentAccount: 0, full: 0 });

  useEffect(() => {
    const total = {
      currentAccount: 0,
      full: 0,
    };

    accounts.forEach((account, accountIndex) => {
      account.data.forEach((expense) => {
        expense.bills.forEach((bill) => {
          total.full += bill.value;

          if (currentAccount === accountIndex) {
            total.currentAccount += bill.value;
          }
        });
      })
    });
    
    setTotals(total);
  }, [accounts, setTotals, currentAccount]);

  const removeExpense = useCallback((expenseIndex: number) => {
    const array = accounts;
    
    array[currentAccount].data.splice(expenseIndex, 1);

    setAccounts([...array]);
  }, [accounts, currentAccount])

  const removeBill = useCallback((expenseIndex: number, billIndex: number) => {
    const array = accounts;
    
    array[currentAccount].data[expenseIndex].bills.splice(billIndex, 1);

    setAccounts([...array]);
  }, [accounts, currentAccount])

  const toggleAccount = useCallback(() => {
    const currentAccountIndex = accountsIDs.indexOf(currentAccount);

    if (currentAccountIndex + 1 === accountsIDs.length || accountsIDs.length === 1) {
      setCurrentAccount(accountsIDs[0]);
    } else {
      setCurrentAccount(accountsIDs[currentAccountIndex + 1]);
    }
  }, [accountsIDs, currentAccount]);

  return (
    <ExpenseContext.Provider value={{ account: accounts[currentAccount], removeExpense, removeBill, toggleAccount, currentAccount, totals }}>
      {children}
    </ExpenseContext.Provider>
  )
}

function useExpense(): ExpenseContextData {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error('useExpense must be within a ExpenseContext');
  }

  return context;
}

export { ExpenseProvider, useExpense };