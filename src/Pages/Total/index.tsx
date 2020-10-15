import React, { useState, useContext, useEffect } from 'react';

import Amount from '../../components/Amount/';
import ExpensesContext, { ExpensesInt } from '../../expensesContext';

import './styles.scss';

export default function Total() {
  const data = useContext(ExpensesContext)[0] as Array<ExpensesInt>;
  const [expensesTotal, setExpensesTotal] = useState(0);
  
  useEffect(() => { 
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      for (let b = 0; b < data[i].bills.length; b++) {
        total += data[i].bills[b].value;
      }
    }

    setExpensesTotal(total);

  }, []);

  return (
    <div className="total-page">
      <Amount route="/redespe/expenses" total={expensesTotal} />
    </div>
  )
}