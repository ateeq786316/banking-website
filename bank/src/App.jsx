import { useState } from 'react'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Transfer from './Transfer'
import Balance from './Balance'
import PayBill from './PayBill'


import {BrowserRouter,Routes, Route} from 'react-router-dom'
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup'     element={<Signup />}>  </Route>
          <Route path='/login'     element={<Login />}>  </Route>
          <Route path='/home'     element={<Home />}>  </Route>
          <Route path='/deposit'  element={<Deposit/>}></Route>
          <Route path='/withdraw' element={<Withdraw/>}></Route>
          <Route path='/transfer' element={<Transfer/>}></Route>
          <Route path='/balance'  element={<Balance/>}></Route>
          <Route path='/paybill'  element={<PayBill/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
