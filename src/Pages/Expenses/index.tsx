import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import './styles.scss';

import Amount from '../../components/Amount/';

import data from '../../data.json';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';

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
interface ImportProps {
  default: string;
  esModule: boolean;
}

export default function Expenses() {
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

  function toggleSetBillsVisibility(id: string, a:string) {
    if (billsVisibility.includes(id)) {
      setBillsVisibility(billsVisibility.filter(sid => sid !== id))
    }
    else {
      let newOpen = [...billsVisibility]
      newOpen.push(id)
      setBillsVisibility(newOpen)
    }
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

              <span className="more-details" onClick={() => toggleSetBillsVisibility(expense.provider, expense.logo)}>
                <p>Ver mais detalhes</p>
                <Arrow />
              </span>

              <AnimateHeight
                duration={ 300 }
                height={ billsVisibility.includes(expense.provider) ? "auto" : 0 }
              >
                <ul className={`bills ${billsVisibility ? "show" : ""}`}>
                  {expense.bills.map(bill => {
                    return (
                    <li className="bill">
                      R${bill.value}
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