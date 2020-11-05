import React, { useState, useContext, useEffect } from 'react';

import Amount from '../../components/Amount/';
import ExpensesContext, { Accounts, ExpensesInt } from '../../expensesContext';
import CurrentAccountContext from '../../currentAccountContext';

import { ReactComponent as ToggleIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';

export default function Total() {
  const staticData = useContext(ExpensesContext)[0] as Array<Accounts>;

  const currentAccount = useContext(CurrentAccountContext)[0] as string;
  const setCurrentAccount = useContext(CurrentAccountContext)[1] as Function;

  const [accountsIDs, setAccountsIDs] = useState<Array<string>>([]);

  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    const [current] = staticData.filter(item => item.id === currentAccount);

    for (let i = 0; i < current.data.length; i++) {
      for (let b = 0; b < current.data[i].bills.length; b++) {
        total += current.data[i].bills[b].value;
      }
    }

    if (!accountsIDs.length) {
      const array: Array<string> = [];
      staticData.map(account => {
        array.push(account.id);
      });

      setAccountsIDs([...array]);
      console.log(accountsIDs, currentAccount);
    }

    setExpensesTotal(total);
  }, [currentAccount]);

  function toggleAccount() {
    const currentAccountIndex = accountsIDs.indexOf(currentAccount);

    if (currentAccountIndex + 1 === accountsIDs.length || accountsIDs.length === 1) {
      setCurrentAccount(accountsIDs[0]);
    } else {
      setCurrentAccount(accountsIDs[currentAccountIndex + 1]);
    }

    console.log(accountsIDs);
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