import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from '@mui/material';
import { UserAuth } from './Components/Users/UserAuth';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar/>
        <Routes>
        <Route path="*" element={<Home/>} exact />
        <Route path="/auth" element={<UserAuth/>} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App