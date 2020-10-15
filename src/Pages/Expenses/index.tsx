import React, { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';

import './styles.scss';

import Amount from '../../components/Amount/';

import myData from '../../data.json';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as Coins } from '../../assets/icons/coins.svg';

interface ExpensesInt {
  provider: string;
  label: string;
  value: number;
  logo: string;
  bills: Array<BillsInt>
}

interface BillsInt {
  expire: string;
  reference: string;
  value: number;
}

export default function Expenses() {
  const [data, setData] = useState<Array<ExpensesInt>>([]);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);


  useEffect(() => { 
    setData(myData);

    let total = 0;
    for (let i = 0; i < myData.length; i++) {
      for (let b = 0; b < myData[i].bills.length; b++) {
        total += myData[i].bills[b].value;
      }
    }

    setExpensesTotal(total);

  }, [])

  function setTotal() {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      for (let b = 0; b < data[i].bills.length; b++) {
        total += data[i].bills[b].value;
      }
    }

    setExpensesTotal(total);

    return total;
  }

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
    return new Date(a).valueOf() - new Date(b).valueOf();
  }

  function getBillsTotal(bills: Array<BillsInt>) {
    let total = 0;
    for (let i = 0; i < bills.length; i++) {
      total += bills[i].value;
    }

    return total.toFixed(2);
  }


  function removeBill(expense_index: number, bill_index: number) {
    let updatedExpenses = data;
    updatedExpenses[expense_index].bills.splice(bill_index, 1);

    setData([...updatedExpenses]);
    setTotal();
  }

  function removeExpense(expense_index: number) {
    let updatedExpenses = data;
    updatedExpenses.splice(expense_index, 1);

    setData([...updatedExpenses]);
    setTotal();
  }

  return (
    <main>
      <Amount route="/redespe" total={expensesTotal}/>
      <ul className="expenses-list">
        {data.map((expense: ExpensesInt, index: number) => {
          return (
            <React.Fragment key={'despesa-' + index}>
              { data[index].bills.length > 0 &&
                <li className="expense-item">
                  <div className="expense-details">
                    <div className="expense-provider">
                      <img src={require(`../../assets/icons/${expense.logo}.svg`)} alt={expense.provider}/>
                      <div>
                        <h2>{expense.provider}</h2>
                        <p>{expense.label}</p>
                      </div>
                    </div>
                    <p className="expense-value">R${getBillsTotal(expense.bills)}</p>
                  </div>

                  <div className="expense-buttons">
                    <button className="btn remove-btn" type="button" onClick={() => removeExpense(index)} >Remover</button>
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
                      {expense.bills.sort((a,b) => getNewDate(a.reference, b.reference)).reverse().map((bill, i: number) => {
                        return (
                        <li className="bill" key={`bill-${i}`}>
                          <div className="bill-details">
                            <span className="bill-date">{formatDate(bill.reference)}</span>
                            <span className="bill-value">R${bill.value.toFixed(2)}</span>
                          </div>
                          <button className="btn" onClick={() => removeBill(index, i)} ><Coins /></button>
                        </li>
                        )
                      })}
                    </ul>
                  </AnimateHeight>
                </li>
              }
            </React.Fragment>
          )
        })}
      </ul>
    </main>
  )
}