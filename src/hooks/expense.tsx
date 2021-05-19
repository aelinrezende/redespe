import React, { createContext, useCallback, useContext } from 'react';

import { useAccount, AccountsProps } from './account';

import { sortArrayOfObjByDate } from '../utils/date';

interface ExpenseContextData {
  removeExpense(expenseIndex: number): void;
  removeBill(expenseID: string, billID: string): void;
  getTotal(): number;
  getMonthlyValue(): number;
}

export interface ExpensesProps {
  id: string;
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

const ExpenseContext = createContext<ExpenseContextData>(
  {} as ExpenseContextData,
);

const ExpenseProvider: React.FC = ({ children }) => {
  const { account, setAccount } = useAccount();

  const removeExpense = useCallback(
    (expenseIndex: number) => {
      const array = account;

      array.data.splice(expenseIndex, 1);

      setAccount({ ...array });
    },
    [account, setAccount],
  );

  const removeBill = useCallback(
    (expenseID: string, billID: string) => {
      setAccount(previousAccountState => {
        let updatedAccount: AccountsProps = { ...previousAccountState };

        let expenseIndex = updatedAccount.data.findIndex(
          expense => expense.id === expenseID,
        );

        let billIndex = updatedAccount.data[expenseIndex].bills.findIndex(
          bill => bill.id === billID,
        );

        updatedAccount.data[expenseIndex].bills.splice(billIndex, 1);

        return updatedAccount;
      });
    },
    [setAccount],
  );

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
        removeExpense,
        removeBill,
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
