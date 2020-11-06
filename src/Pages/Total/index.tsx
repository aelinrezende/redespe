import React, { useState, useContext, useEffect } from 'react';

import Amount from '../../components/Amount/';

import './styles.scss';

export default function Total() {
  return (
    <div className="total-page">
      <Amount 
        route="/redespe/expenses" 
      />
    </div>
  )
}