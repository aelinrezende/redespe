import React, { useState, useCallback, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { bills as billsVariants } from './motion.variants';
import { formatDate, sortArrayOfObjByDate } from '../../utils/date';

import Amount from '../../components/Amount';
import Navbar from '../../components/Navbar/';

import Bill from './children/Bill/';

import { useExpense, BillsProps, AccountsProps } from '../../hooks/expense';

import {
  Container,
  ExpensesList,
  Expense,
  ExpenseContent,
  ExpenseMain,
  ExpenseButtonsTop,
  RemoveIcon,
  EditIcon,
  MoreIcon,
  Bills,
} from './styles';

const Expenses: React.FC = () => {
  const { account, removeBill, removeExpense } = useExpense();
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

  const [expenses, setExpenses] = useState<AccountsProps>(account);

  useEffect(() => {
    setExpenses(account);
  }, [account]);

  const toggleBillsVisibility = useCallback(
    (id: string) => {
      if (billsVisibility.includes(id)) {
        setBillsVisibility(billsVisibility.filter(sid => sid !== id));
      } else {
        const newOpen = [...billsVisibility];
        newOpen.push(id);
        setBillsVisibility(newOpen);
      }
    },
    [billsVisibility],
  );

  const getBillsTotal = useCallback((bills: Array<BillsProps>) => {
    let total = 0;
    for (let i = 0; i < bills.length; i++) {
      total += bills[i].value;
    }

    return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, []);

  const handleRemoveBill = useCallback(
    (expenseIndex: number, billID: string) => {
      removeBill(expenseIndex, billID);
    },
    [removeBill],
  );

  const handleRemoveExpense = useCallback(
    (expenseIndex: number) => {
      removeExpense(expenseIndex);
    },
    [removeExpense],
  );

  const formatNumberToCurrency = useCallback(number => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, []);

  const sortDate = useCallback(
    (array: any[]) => sortArrayOfObjByDate(array, 'reference'),
    [],
  );

  const setDate = useCallback((date: string): string => formatDate(date), []);

  return (
    <Container>
      <Amount route="/redespe" />
      <ExpensesList>
        {expenses.data.map(({ bills, label, provider }, expenseIndex) => {
          if (bills.length)
            return (
              <Expense key={label + provider + account.id}>
                <ExpenseMain>
                  <ExpenseContent>
                    <div />

                    <div>
                      <h2>{provider}</h2>
                      <span>{label}</span>
                    </div>

                    <p>R${getBillsTotal(bills)}</p>
                  </ExpenseContent>

                  <ExpenseButtonsTop>
                    <a href="google.com">
                      <EditIcon />
                    </a>
                    <button>
                      <RemoveIcon
                        onClick={() => handleRemoveExpense(expenseIndex)}
                      />
                    </button>
                  </ExpenseButtonsTop>

                  <MoreIcon onClick={() => toggleBillsVisibility(provider)} />
                </ExpenseMain>
                <Bills
                  variants={billsVariants.container}
                  initial={false}
                  transition={{ duration: 0.3 }}
                  animate={
                    billsVisibility.includes(provider) ? 'visible' : 'hidden'
                  }
                >
                  <AnimatePresence>
                    {sortDate(bills).map((billProps: BillsProps) => (
                      <Bill
                        key={billProps.id}
                        {...billProps}
                        expenseIndex={expenseIndex}
                        removeBill={handleRemoveBill}
                      />
                    ))}
                  </AnimatePresence>
                </Bills>
              </Expense>
            );
        })}
      </ExpensesList>
      <Navbar />
    </Container>
  );
};

export default memo(Expenses);
