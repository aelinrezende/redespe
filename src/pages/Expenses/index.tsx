import React, { useState, useCallback, memo, Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';

import { bills as billsVariants } from './motion.variants';
import { sortArrayOfObjByDate } from '../../utils/date';

import Amount from '../../components/Amount';
import Navbar from '../../components/Navbar/';

import BillWrapper from '../../components/BillWrapper/';

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
  Bills,
} from './styles';

const Expenses: React.FC = () => {
  const { account, removeExpense, removeBill } = useExpense();
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
    (expenseID: string, billID: string) => {
      removeBill(expenseID, billID);
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
      <Amount route="/" />
      <ExpensesList>
        {account.data?.map(
          ({ bills, label, provider, id: expenseID }, expenseIndex) => (
            <Fragment key={label + account.id}>
              {bills.length > 0 && (
                <Expense key={label + provider + account.id}>
                  <ExpenseMain
                    onClick={() => toggleBillsVisibility(provider + account.id)}
                  >
                    <ExpenseContent>
                      <div />

                      <div>
                        <h2>{provider}</h2>
                        <span>{label}</span>
                      </div>

                      <p>R${getBillsTotal(bills)}</p>
                    </ExpenseContent>

                    <ExpenseButtonsTop>
                      <a href="/nowhere">
                        <EditIcon />
                      </a>
                      <button>
                        <RemoveIcon
                          onClick={() => handleRemoveExpense(expenseIndex)}
                        />
                      </button>
                    </ExpenseButtonsTop>
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
                        {sortDate(bills).map(billProps => (
                          <BillWrapper
                            {...billProps}
                            key={billProps.id}
                            expenseID={expenseID}
                            removeBill={handleRemoveBill}
                          />
                        ))}
                      </Bills>
                    )}
                  </AnimatePresence>
                </Expense>
              )}
            </Fragment>
          ),
        )}
      </ExpensesList>
      <Navbar />
    </Container>
  );
};

export default memo(Expenses);
