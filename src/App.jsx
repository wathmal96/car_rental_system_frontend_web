
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Registre from './pages/Registre/Registre'
import Login from './pages/Login/Login'
import { useState,useEffect } from 'react'
import { Box } from '@mui/material'

function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('login')
    if (token) {
      setLogin(true)
    }
    else {
      setLogin(false)
    }
  }, [])

  return (

    <>
      {
        login ?
          <Home />
          :
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '100vh',
              alignItems: 'center'
            }}
          >
            <Routes>
              <Route path='*' element={<Navigate to={'/login'} />} />
              <Route path='/registre' element={<Registre />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Box>
      }

    </>
  )
}

export default App
