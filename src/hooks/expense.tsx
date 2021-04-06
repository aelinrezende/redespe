import React, { createContext, useCallback, useContext, useState } from 'react';

import staticData from '../data.json';

import { sortArrayOfObjByDate } from '../utils/date';

interface ExpenseContextData {
  account: AccountsProps;
  currentAccount: number;
  removeExpense(expenseIndex: number): void;
  removeBill(expenseIndex: number, billIndex: number): void;
  toggleAccount(): void;
  getTotal(): number;
  getMonthlyValue(): number;
}

export interface AccountsProps {
  id: string;
  label: string;
  data: Array<ExpensesProps>;
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
    status: boolean;
    reference?: number;
  };
}

interface TotalsProps {
  currentAccount: number;
  monthly: number;
  full: number;
}

const ExpenseContext = createContext<ExpenseContextData>(
  {} as ExpenseContextData,
);

const ExpenseProvider: React.FC = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountsProps[]>(staticData);
  const [accountsIDs] = useState<number[]>(() => {
    const array: number[] = [];
    accounts.forEach((_, i) => {
      array.push(i);
    });

    return array;
  });

  const [currentAccount, setCurrentAccount] = useState<number>(0);

  const removeExpense = useCallback(
    (expenseIndex: number) => {
      const array = accounts;

      array[currentAccount].data.splice(expenseIndex, 1);

      setAccounts([...array]);
    },
    [accounts, currentAccount],
  );

  const removeBill = useCallback(
    (expenseIndex: number, billIndex: number) => {
      const array = accounts;

      array[currentAccount].data[expenseIndex].bills.splice(billIndex, 1);

      setAccounts([...array]);
    },
    [accounts, currentAccount],
  );

  const toggleAccount = useCallback(() => {
    const currentAccountIndex = accountsIDs.indexOf(currentAccount);

    if (
      currentAccountIndex + 1 === accountsIDs.length ||
      accountsIDs.length === 1
    ) {
      setCurrentAccount(accountsIDs[0]);
    } else {
      setCurrentAccount(accountsIDs[currentAccountIndex + 1]);
    }
  }, [accountsIDs, currentAccount]);

  const getTotal = useCallback(() => {
    let value: number = 0;

    accounts[currentAccount].data.forEach(expense => {
      expense.bills.forEach(bill => {
        value += bill.value;
      });
    });

    return value;
  }, [accounts, currentAccount]);

  const getMonthlyValue = useCallback(() => {
    let value: number = 0;

    accounts[currentAccount].data.forEach(expense => {
      if (expense.bills.length) {
        value += sortArrayOfObjByDate(expense.bills, 'reference')[0].value;
      }
    });

    return value;
  }, [accounts, currentAccount]);

  return (
    <ExpenseContext.Provider
      value={{
        account: accounts[currentAccount],
        removeExpense,
        removeBill,
        toggleAccount,
        currentAccount,
        getTotal,
        getMonthlyValue,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

function useExpense(): ExpenseContextData {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error('useExpense must be within a ExpenseContext');
  }

  return context;
}

export { ExpenseProvider, useExpense };
