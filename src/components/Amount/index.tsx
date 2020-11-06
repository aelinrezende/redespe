import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ExpensesContext, { Accounts } from '../../expensesContext';
import CurrentAccountContext from '../../currentAccountContext';

import { ReactComponent as ToggleIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';
interface ExpensesProps {
  route: string;
}

const Amount: React.FC<ExpensesProps> = (props) => {
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
    }

    setExpensesTotal(total);
  }, [currentAccount, staticData]);

  const toggleAccount = () => {
    const currentAccountIndex = accountsIDs.indexOf(currentAccount);

    if (currentAccountIndex + 1 === accountsIDs.length || accountsIDs.length === 1) {
      setCurrentAccount(accountsIDs[0]);
    } else {
      setCurrentAccount(accountsIDs[currentAccountIndex + 1]);
    }
  }

  return (
    <div className="amount-container">
      <div>
        <p>Total</p>
        <div className="account-toggle" onClick={() => toggleAccount()}>
          {staticData.filter(item => item.id === currentAccount)[0].label}
          <ToggleIcon/>
        </div>
        <div className="total-details">
          <span>R${expensesTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <Link to={`${props.route}`}>
            <ArrowDownIcon
              className={props.route !== '/redespe' ? "total-home-arrow" : "total-rotate-arrow"}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Amount;