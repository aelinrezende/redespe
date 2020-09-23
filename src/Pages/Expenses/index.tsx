import React, { useState } from 'react';

import './styles.scss';

import Amount from '../../components/Amount/';

interface ExpensesInt {
  provider: string;
  label: string;
  value: number;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Array<ExpensesInt>>([
    {
      provider: 'Enel',
      label: 'Luz',
      value: 3287,
    },
    {
      provider: 'Sabesp',
      label: 'Àgua',
      value: 560,
    },
    {
      provider: 'Outros',
      label: 'Outros',
      value: 5581,
    },
  ]);

  return (
    <main>
      <Amount />
      <ul className="expenses-list">
        {expenses.map(expense => {
          return (
            <li className="expense-item">
              <div className="expense-provider">
                <h2>{expense.provider}</h2>
                <p>{expense.label}</p>
              </div>
              <p className="expense-value">R${expense.value},00</p>
            </li>
          )
        })}
      </ul>
    </main>
  )
}