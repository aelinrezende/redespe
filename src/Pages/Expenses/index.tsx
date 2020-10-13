import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import './styles.scss';

import Amount from '../../components/Amount/';

import data from '../../data.json';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as Coins } from '../../assets/icons/coins.svg';

interface ExpensesInt {
  provider: string;
  label: string;
  value: number;
  logo: string;
  bills: Array<{
    expire: string;
    reference: string;
    value: number;
  }>
}

export default function Expenses() {
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

  function toggleSetBillsVisibility(id: string) {
    if (billsVisibility.includes(id)) {
      setBillsVisibility(billsVisibility.filter(sid => sid !== id))
    }
    else {
      let newOpen = [...billsVisibility]
      newOpen.push(id)
      setBillsVisibility(newOpen)
    }
  }

  function formatDate(date: string) {
    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const newDate = new Date(date);

    return `${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;
  }

  function getNewDate(a:string, b: string) {
    const [dateA, dateB] = [Number(new Date(a)), Number(new Date(b))]
    return dateA - dateB;
  }


  return (
    <main>
      <Amount route="/redespe" />
      <ul className="expenses-list">
        {data.map((expense: ExpensesInt, index: number) => {
          return (
            <li key={'despesa-' + index} className="expense-item">
              <div className="expense-details">
                <div className="expense-provider">
                  <img src={require(`../../assets/icons/${expense.logo}.svg`)} alt={expense.provider}/>
                  <div>
                    <h2>{expense.provider}</h2>
                    <p>{expense.label}</p>
                  </div>
                </div>
                <p className="expense-value">R${(Math.round(expense.value * 100) / 100).toLocaleString()}</p>
              </div>

              <div className="expense-buttons">
                <button className="btn remove-btn" type="button">Remover</button>
                <button className="btn edit-btn" type="button">Editar</button>
              </div>

              <span className="more-details" onClick={() => toggleSetBillsVisibility(expense.provider)}>
                <p>Ver mais detalhes</p>
                <Arrow />
              </span>

              <AnimateHeight
                duration={ 300 }
                height={ billsVisibility.includes(expense.provider) ? "auto" : 0 }
              >
                <ul className={`bills ${billsVisibility ? "show" : ""}`}>
                  {expense.bills.sort((a,b) => getNewDate(a.reference, b.reference)).reverse().map(bill => {
                    return (
                    <li className="bill">
                      <div className="bill-details">
                        <span className="bill-date">{formatDate(bill.reference)}</span>
                        <span className="bill-value">R${(Math.round(bill.value * 100) / 100).toLocaleString()}</span>
                      </div>
                      <button className="btn"><Coins /></button>
                    </li>
                    )
                  })}
                </ul>
              </AnimateHeight>
            </li>
          )
        })}
      </ul>
    </main>
  )
}