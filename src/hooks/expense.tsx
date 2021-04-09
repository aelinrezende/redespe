import React, { createContext, useCallback, useContext, useState } from 'react';

import staticData from '../data.json';

import { sortArrayOfObjByDate } from '../utils/date';

interface ExpenseContextData {
  account: AccountsProps;
  currentAccount: number;
  removeExpense(expenseIndex: number): void;
  removeBill(expenseIndex: number, billID: string): void;
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
  id: string;
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
  const [account, setAccount] = useState<AccountsProps>(
    accounts[currentAccount],
  );

  const removeExpense = useCallback(
    (expenseIndex: number) => {
      const array = account;

      array.data.splice(expenseIndex, 1);

      setAccount({ ...array });
    },
    [account],
  );

  const removeBill = useCallback(
    (expenseIndex: number, billID: string) => {
      const obj = account;
      const billIndex = account.data[expenseIndex].bills.findIndex(
        bill => (bill.id = billID),
      );

      obj.data[expenseIndex].bills.splice(billIndex, 1);

      setAccount({ ...obj });
    },
    [account],
  );

  const toggleAccount = useCallback(() => {
    const currentAccountIndex = accountsIDs.indexOf(currentAccount);

    if (
      currentAccountIndex + 1 === accountsIDs.length ||
      accountsIDs.length === 1
    ) {
      setCurrentAccount(accountsIDs[0]);
      setAccount(accounts[currentAccount]);
    } else {
      setCurrentAccount(accountsIDs[currentAccountIndex + 1]);
      setAccount(accounts[currentAccount]);
    }
  }, [accountsIDs, currentAccount, accounts]);

  const getTotal = useCallback(() => {
    let value: number = 0;

    account.data.forEach(expense => {
      expense.bills.forEach(bill => {
        value += bill.value;
      });
    });

    return value;
  }, [account]);

  const getMonthlyValue = useCallback(() => {
    let value: number = 0;

    account.data.forEach(expense => {
      if (expense.bills.length) {
        value += sortArrayOfObjByDate(expense.bills, 'reference')[0].value;
      }
    });

    return value;
  }, [account]);

  return (
    <ExpenseContext.Provider
      value={{
        account,
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
