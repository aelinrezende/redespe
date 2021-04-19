import React, { useState, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useExpense } from '../../hooks/expense';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';
interface ExpensesProps {
  route: string;
}

const Amount: React.FC<ExpensesProps> = ({ route }) => {
  const { getTotal, currentAccount } = useExpense();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [getTotal]);

  return (
    <div className="amount-container">
      <p>Total C/{currentAccount + 1}</p>
      <div className="total-details">
        <span>
          <span>R$</span>
          {total?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
        <Link to={`${route}`}>
          <ArrowDownIcon
            className={route === '/' ? 'total-rotate-arrow' : ''}
          />
        </Link>
      </div>
    </div>
  );
};

export default memo(Amount);
