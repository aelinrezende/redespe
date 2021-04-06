import React, { useState, useCallback, memo } from 'react';
import AnimateHeight from 'react-animate-height';
import { v4 } from 'uuid';

import { formatDate, sortArrayOfObjByDate } from '../../utils/date';

import Amount from '../../components/Amount';

import { useExpense, ExpensesProps, BillsProps } from '../../hooks/expense';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as Coins } from '../../assets/icons/coins.svg';

import './styles.scss';

const Expenses: React.FC = () => {
  const { account, removeBill, removeExpense } = useExpense();
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

  const toggleSetBillsVisibility = useCallback(
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

  const sortDate = useCallback(
    (array: any[]) => sortArrayOfObjByDate(array, 'reference'),
    [],
  );

  const setDate = useCallback((date: string): string => formatDate(date), []);

  return (
    <main>
      <Amount route="/redespe" />
      <ul className="expenses-list">
        {account.data.map((expense: ExpensesProps, index: number) => (
          <React.Fragment key={v4()}>
            {account.data[index].bills.length > 0 && (
              <li className="expense-item">
                <div className="expense-details">
                  <div className="expense-provider">
                    <img
                      src={require(`../../assets/icons/${expense.logo}.svg`)}
                      alt={expense.provider}
                    />
                    <div>
                      <h2>{expense.provider}</h2>
                      <p>{expense.label}</p>
                    </div>
                  </div>
                  <p className="expense-value">
                    R$
                    {getBillsTotal(expense.bills)}
                  </p>
                </div>

                <div className="expense-buttons">
                  <button
                    className="btn remove-btn"
                    type="button"
                    onClick={() => handleRemoveExpense(index)}
                  >
                    Remover
                  </button>
                  <button className="btn edit-btn" type="button">
                    Editar
                  </button>
                </div>

                <span
                  className="more-details"
                  onClick={() => toggleSetBillsVisibility(expense.provider)}
                >
                  <p>Ver mais detalhes</p>
                  <Arrow
                    className={
                      billsVisibility.includes(expense.provider)
                        ? 'active-expense'
                        : ''
                    }
                  />
                </span>

                <AnimateHeight
                  duration={300}
                  height={
                    billsVisibility.includes(expense.provider) ? 'auto' : 0
                  }
                >
                  <ul className={`bills ${billsVisibility ? 'show' : ''}`}>
                    {sortDate(expense.bills).map((bill, i: number) => (
                      <li className="bill" key={v4()}>
                        <div className="bill-details">
                          {bill.installment.status && (
                            <span className="bill-installment">
                              Acordo - Parcela
                              {bill.installment.reference}
                            </span>
                          )}
                          <span className="bill-date">
                            {setDate(bill.reference)}
                          </span>
                          <span className="bill-value">
                            R$
                            {bill.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <button
                          className="btn"
                          onClick={() => handleRemoveBill(index, i)}
                        >
                          <Coins />
                        </button>
                      </li>
                    ))}
                  </ul>
                </AnimateHeight>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </main>
  );
};

export default memo(Expenses);
