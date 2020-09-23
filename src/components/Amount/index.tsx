import React from 'react';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Amount() {

  return (
    <div className="amount-container">
      <p>Total</p>
      <div>
        <span>R$9.430,12</span>
        <Link to="/expenses">
          <ArrowDownIcon
            className="total-rotate-arrow"
          />
        </Link>
      </div>
    </div>
  )
}