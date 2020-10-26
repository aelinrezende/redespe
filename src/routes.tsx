import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Total from './pages/Total/';
import Expenses from './pages/Expenses/';
import Navbar from './components/Navbar/';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/redespe" exact component={Total}/>
      <Route path="/redespe/expenses" component={Expenses}/>
      <Route path="/redespe/" component={Navbar}/>
    </BrowserRouter>
  )
}

export default Routes;