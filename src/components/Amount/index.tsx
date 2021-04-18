import React, { useState, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useExpense } from '../../hooks/expense';

import { ReactComponent as ToggleIcon } from '../../assets/icons/toggle.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';
interface ExpensesProps {
  route: string;
}

const Amount: React.FC<ExpensesProps> = ({ route }) => {
  const { account, toggleAccount, getTotal } = useExpense();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [getTotal]);

  return (
    <div className="amount-container">
      <div>
        <p>Total</p>
        <div className="total-details">
          <span>
            <span>R$</span>
            {total?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
          <Link to={`${route}`}>
            <ArrowDownIcon
              className={
                route !== '/redespe' ? 'total-home-arrow' : 'total-rotate-arrow'
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Amount);
