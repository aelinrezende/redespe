import React, { useState, useCallback, memo } from 'react';
import { AnimatePresence } from 'framer-motion';

import { RiHandCoinFill as PayIcon } from 'react-icons/ri';

import { bills as billsVariants } from './motion.variants';
import { formatDate, sortArrayOfObjByDate } from '../../utils/date';

import Amount from '../../components/Amount';
import Navbar from '../../components/Navbar/';

import { useExpense, BillsProps } from '../../hooks/expense';

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
  Bill,
} from './styles';

const Expenses: React.FC = () => {
  const { account, removeBill, removeExpense } = useExpense();
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

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
    (expenseIndex: number, billIndex: number) => {
      removeBill(expenseIndex, billIndex);
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
        {account.data.map(({ bills, label, provider }, expenseIndex) => (
          <Expense key={label + provider}>
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
                {sortDate(bills).map(
                  ({ expire, installment, reference, value }, billIndex) => (
                    <Bill
                      variants={billsVariants.child}
                      transition={{ duration: 0.3 }}
                      whileHover={billsVariants.child.hover}
                      exit={billsVariants.child.exit}
                      key={reference + value + expire}
                    >
                      <div>
                        <span>
                          {setDate(reference)}{' '}
                          {installment.status &&
                            ' | Parcela ' + installment.reference}
                        </span>
                        <p>R${formatNumberToCurrency(value)}</p>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveBill(expenseIndex, billIndex)
                        }
                      >
                        <PayIcon />
                      </button>
                    </Bill>
                  ),
                )}
              </AnimatePresence>
            </Bills>
          </Expense>
        ))}
      </ExpensesList>
      <Navbar />
    </Container>
  );
};

export default memo(Expenses);
