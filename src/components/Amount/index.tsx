import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import { useExpense } from '../../hooks/expense';

import { ReactComponent as ToggleIcon } from '../../assets/icons/toggle.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';
interface ExpensesProps {
  route: string;
}

const Amount: React.FC<ExpensesProps> = props => {
  const { account, getTotal, toggleAccount } = useExpense();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [getTotal]);

  return (
    <div className="amount-container">
      <div>
        <p>Total</p>
        <div className="account-toggle" onClick={() => toggleAccount()}>
          {account.label}
          <ToggleIcon />
        </div>
        <div className="total-details">
          <span>
            R$
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
          <Link to={`${props.route}`}>
            <ArrowDownIcon
              className={
                props.route !== '/redespe'
                  ? 'total-home-arrow'
                  : 'total-rotate-arrow'
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Amount);
