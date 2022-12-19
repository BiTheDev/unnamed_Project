import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from '@mui/material';
import { UserAuth } from './Components/Users/UserAuth';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import { UserDetails } from './Components/Users/UserDetails/UserDetails';
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar/>
        <Routes>
        <Route path="*" element={<Home/>} exact />
        <Route path="/auth" element={<UserAuth/>} exact />
        <Route path="/user/profile/:id" element={<UserDetails/>} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App