import React, { useState, useContext, useEffect } from 'react';

import Amount from '../../components/Amount/';
import ExpensesContext, { Accounts, ExpensesInt } from '../../expensesContext';

import './styles.scss';

export default function Total() {
  const staticData = useContext(ExpensesContext)[0] as Array<Accounts>;
  const [currentAccount, setCurrentAccount] = useState<number>(0);
  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < staticData[currentAccount].data.length; i++) {
      for (let b = 0; b < staticData[currentAccount].data[i].bills.length; b++) {
        total += staticData[currentAccount].data[i].bills[b].value;
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