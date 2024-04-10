import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import SignupPage2 from './SignupPage2'
import LoginPage2 from './LoginPage2'
import LeaveForm from './LeaveForm'
import HomePage from './HomePage'
import LeaveRule from './LeaveRule'
import SignupForm from './SignupForm'
import ManagerHomePage from './ManagerHomePage'
import MainPage from './MainPage'
import TableForm from './TableForm'
import ManagerTableForm from './ManagerTableForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/SignupPage2' element={<SignupPage2 />}></Route>
        <Route path='/SignupPage' element={<SignupPage />}></Route>
        <Route path='/LoginPage2' element={<LoginPage2 />}></Route>
        <Route path='/LoginPage' element={<LoginPage />}></Route>
        <Route path='/LoginPage/HomePage/' element={<HomePage />}></Route>
        <Route path='/LoginPage2/ManagerHomePage/' element={<ManagerHomePage />}></Route>
        <Route path='/LeaveForm' element={<LeaveForm />}></Route>
        <Route path='/TableForm' element={<TableForm />}></Route>
        <Route path='/ManagerTableForm' element={<ManagerTableForm />}></Route>
        <Route path='/LeaveRule' element={<LeaveRule />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
