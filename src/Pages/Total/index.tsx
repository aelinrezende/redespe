import React, { useState } from 'react';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow.svg';

import './styles.scss';

export default function Total() {
  const [anim, setAnim] = useState(false);

  function initAnimation() {
    setAnim(true);
  }

  return (
    <div className={`expenses-page ${anim ? 'total-to-start' : ''}`}>
      <h1 className={anim ? 'title-anim-off' : ''}>Despesas</h1>
      <div className={`expenses-page-total ${anim ? 'total-to-top' : ''}`}>
        <p>Total</p>
        <div>
          <span>R$9.430,12</span>
          <ArrowDownIcon
            className={anim ? 'total-rotate-arrow' : ''}
            onClick={initAnimation}
          />
        </div>
      </div>
    </div>
  )
}