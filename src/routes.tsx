import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Total from './Pages/Total/';
import Expenses from './Pages/Expenses/';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/redespe" exact component={Total}/>
      <Route path="/redespe/expenses" component={Expenses}/>
    </BrowserRouter>
  )
}

export default Routes;