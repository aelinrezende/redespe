import React, { useState, useEffect, useContext } from 'react';
import AnimateHeight from 'react-animate-height';

import { formatDate, sortByDate } from '../utils/date';

import Amount from '../../components/Amount/';

import ExpensesContext, { Accounts, ExpensesInt, BillsInt } from '../../expensesContext';
import CurrentAccountContext from '../../currentAccountContext';

import { ReactComponent as Arrow } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as Coins } from '../../assets/icons/coins.svg';

import './styles.scss'; 

export default function Expenses() {
  const staticData = useContext(ExpensesContext)[0] as Array<Accounts>;
  const setData = useContext(ExpensesContext)[1] as Function;
  const currentAccount = useContext(CurrentAccountContext)[0] as string;
  const [billsVisibility, setBillsVisibility] = useState<Array<string>>([]);

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
    let updatedExpenses = staticData;
    staticData.forEach((account, i: number) => {
      if (account.id === currentAccount) {
        updatedExpenses[i].data[expense_index].bills.splice(bill_index, 1);
      }
    });

    setData([...updatedExpenses]);
  }

  // almost completed way of removing a specific expense
  const removeExpense = (expense_index: number) => {
    let updatedExpenses = staticData;
    staticData.map((account, i: number) => {
      if (account.id === currentAccount) {
        updatedExpenses[i].data.splice(expense_index, 1);
      }
    });

    setData([...updatedExpenses]);
  }

  return (
    <main>
      <Amount 
        route="/redespe" 
      />
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
                              { bill.installment.status && 
                                <span className="bill-installment">Acordo - Parcela {bill.installment.reference}</span> 
                              }
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