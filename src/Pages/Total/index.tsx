import React, { useState, useContext, useEffect } from 'react';

import Amount from '../../components/Amount/';
import ExpensesContext, { Accounts, ExpensesInt } from '../../expensesContext';

import { ReactComponent as ToggleIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';

export default function Total() {
  const staticData = useContext(ExpensesContext)[0] as Array<Accounts>;
  const [currentAccount, setCurrentAccount] = useState<string>('casa_01');
  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    const [current] = staticData.filter(item => item.id === currentAccount);

    for (let i = 0; i < current.data.length; i++) {
      for (let b = 0; b < current.data[i].bills.length; b++) {
        total += current.data[i].bills[b].value;
      }
    }

    setExpensesTotal(total);
  }, [currentAccount]);

  function toggleAccount() {
    setCurrentAccount('casa_02');
  }

  return (
    <div className="total-page">
      <div onClick={() => toggleAccount()}>
        {staticData.filter(item => item.id === currentAccount)[0].id}
        <ToggleIcon/>
      </div>
      <Amount route="/redespe/expenses" total={expensesTotal} />
    </div>
  )
}