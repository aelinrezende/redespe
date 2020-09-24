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
      value: 3287.99,
    },
    {
      provider: 'Sabesp',
      label: 'Àgua',
      value: 560.68,
    },
    {
      provider: 'Outros',
      label: 'Diversos',
      value: 5581.45,
    },
  ]);

  return (
    <main>
      <Amount route="/redespe" />
      <ul className="expenses-list">
        {expenses.map((expense, index) => {
          return (
            <li key={'despesa-' + index} className="expense-item">
              <div className="expense-provider">
                <h2>{expense.provider}</h2>
                <p>{expense.label}</p>
              </div>
              <p className="expense-value">R${(Math.round(expense.value * 100) / 100).toLocaleString()}</p>
            </li>
          )
        })}
      </ul>
    </main>
  )
}