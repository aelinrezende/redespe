import React from 'react';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';
import { Link } from 'react-router-dom';

import './styles.scss';

interface ExpensesProps {
  route: string;
}

const Amount: React.FC<ExpensesProps> = (props) => {
  return (
    <div className="amount-container">
      <p>Total</p>
      <div>
        <span>R$9.430,12</span>
        <Link to={`${props.route}`}>
          <ArrowDownIcon
            className="total-rotate-arrow"
          />
        </Link>
      </div>
    </div>
  )
}

export default Amount;