import React, { useState, useCallback, memo, Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';

import { bills as billsVariants } from './motion.variants';
import { sortArrayOfObjByDate } from '../../utils/date';

import Amount from '../../components/Amount';
import Navbar from '../../components/Navbar/';

import Bill from './children/Bill/';

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

  const sortDate = useCallback(
    (array: any[]) => sortArrayOfObjByDate(array, 'reference'),
    [],
  );

  return (
    <Container>
      <Amount route="/redespe" />
      <ExpensesList>
        {account.data?.map(({ bills, label, provider }, expenseIndex) => (
          <Fragment key={label + account.id}>
            {bills.length > 0 && (
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

                  <MoreIcon
                    onClick={() => toggleBillsVisibility(provider + account.id)}
                  />
                </ExpenseMain>
                <AnimatePresence>
                  {billsVisibility.includes(provider + account.id) && (
                    <Bills
                      key={account.id + provider}
                      initial={billsVariants.container.initial}
                      animate={billsVariants.container.visible}
                      exit={billsVariants.container.exit}
                      transition={{ duration: 0.3 }}
                    >
                      {sortDate(bills).map((billProps: BillsProps, billID) => (
                        <Bill
                          key={billProps.id}
                          {...billProps}
                          removeBill={handleRemoveBill}
                          expenseIndex={expenseIndex}
                        />
                      ))}
                    </Bills>
                  )}
                </AnimatePresence>
              </Expense>
            )}
          </Fragment>
        ))}
      </ExpensesList>
      <Navbar />
    </Container>
  );
};

export default memo(Expenses);
