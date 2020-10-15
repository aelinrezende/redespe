import React from 'react';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';
import { Link } from 'react-router-dom';

import './styles.scss';
interface ExpensesProps {
  route: string;
  total: number;
}

const Amount: React.FC<ExpensesProps> = (props) => {
  return (
    <div className="amount-container">
      <p>Total</p>
      <div >
        <span>R${props.total.toFixed(2)}</span>
        <Link to={`${props.route}`}>
          <ArrowDownIcon
            className={props.route !== '/redespe' ? "total-home-arrow" : "total-rotate-arrow"}
          />
        </Link>
      </div>
    </div>
  )
}

export default Amount;