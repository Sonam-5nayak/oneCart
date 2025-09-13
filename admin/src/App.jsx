import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Orders from './pages/Orders'
import Add from './pages/Add'
import Login from './pages/Login'
import List from './pages/List'
import Home from './pages/Home'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify';

function App() {
  let { adminData } = useContext(adminDataContext)

  return (
    <>
      <ToastContainer />
      {!adminData ? <Login /> : <>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </>
      }
    </>
  )
}

export default App
