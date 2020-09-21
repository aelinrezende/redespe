import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Total from './Pages/Total/';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Total}/>
    </BrowserRouter>
  )
}

export default Routes;