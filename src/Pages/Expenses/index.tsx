import React, { useState, useEffect, useContext } from 'react';
import AnimateHeight from 'react-animate-height';

import Amount from '../../components/Amount/';
import ExpensesContext, { Accounts, ExpensesInt, BillsInt } from '../../expensesContext';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as Coins } from '../../assets/icons/coins.svg';

import './styles.scss';

export default function Expenses() {
  const staticData = useContext(ExpensesContext)[0] as Array<Accounts>;
  const [currentAccount, setCurrentAccount] = useState<string>('casa_01');
  const setData = useContext(ExpensesContext)[1] as Function;

  const [expensesTotal, setExpensesTotal] = useState(0);
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

  // temporary way to set the expenses value...
  useEffect(() => {
    let total = 0;
    const current = staticData.filter(item => item.id === currentAccount)[0];

    for (let i = 0; i < current.data.length; i++) {
      for (let b = 0; b < current.data[i].bills.length; b++) {
        total += current.data[i].bills[b].value;
      }
    }

    setExpensesTotal(total);
  }, [])

  // temporary way to set the expenses total value...
  const setTotal = () => {
    let total = 0;
    const current = staticData.filter(item => item.id === currentAccount)[0];

    for (let i = 0; i < current.data.length; i++) {
      for (let b = 0; b < current.data[i].bills.length; b++) {
        total += current.data[i].bills[b].value;
      }
    }

    setExpensesTotal(total);
  }

  // tracking the "opened/active" expenses bills by id
  const toggleSetBillsVisibility = (id: string) => {
    if (billsVisibility.includes(id)) {
      setBillsVisibility(billsVisibility.filter(sid => sid !== id))
    }
    else {
      let newOpen = [...billsVisibility]
      newOpen.push(id)
      setBillsVisibility(newOpen)
    }
  }

  // formatting date to pt-BR...
  const formatDate = (date: string) => {
    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const newDate = new Date(date);

    return `${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;
  }

  // sorting array by date
  const sortByDate = (a:string, b: string) => {
    return new Date(a).valueOf() - new Date(b).valueOf();
  }

  // getting the expense bills total
  const getBillsTotal = (bills: Array<BillsInt>) => {
    let total = 0;
    for (let i = 0; i < bills.length; i++) {
      total += bills[i].value;
    }

    return total.toLocaleString(
      undefined,
      { minimumFractionDigits: 2 }
    );
  }

  // almost completed way of removing a specific bill from a certain expense
  const removeBill = (expense_index: number, bill_index: number) => {
    let updatedExpenses = staticData.filter(item => item.id === currentAccount)[0];
    updatedExpenses.data[expense_index].bills.splice(bill_index, 1);

    setData(updatedExpenses);
    setTotal();
  }

  // almost completed way of removing a specific expense
  const removeExpense = (expense_index: number) => {
    let updatedExpenses = staticData.filter(item => item.id === currentAccount);
    updatedExpenses[0].data.splice(expense_index, 1);

    setData([...updatedExpenses]);
    setTotal();
  }

  return (
    <main>
      <Amount route="/redespe" total={expensesTotal}/>
      <ul className="expenses-list">
        { staticData.filter(item => item.id === currentAccount)[0].data.map((expense: ExpensesInt, index: number) => {
          return (
            <React.Fragment key={'despesa-' + index}>
              { staticData.filter(item => item.id === currentAccount)[0].data[index].bills.length > 0 &&
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
                    <Arrow className={ billsVisibility.includes(expense.provider) ? "active-expense" : "" }/>
                  </span>

                  <AnimateHeight
                    duration={ 300 }
                    height={ billsVisibility.includes(expense.provider) ? "auto" : 0 }
                  >
                    <ul className={`bills ${billsVisibility ? "show" : ""}`}>
                      {expense.bills.sort((a,b) => sortByDate(a.reference, b.reference)).reverse().map((bill, i: number) => {
                        return (
                          <li className="bill" key={`bill-${i}`}>
                            <div className="bill-details">
                              <span className="bill-date">{formatDate(bill.reference)}</span>
                              <span className="bill-value">R${bill.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
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