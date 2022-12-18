import React from 'react'
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { Container } from '@mui/material';
import { UserAuth } from './Components/Users/UserAuth';
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        {/* <Navbar /> */}
        <Routes>
        <Route path="/" element={<UserAuth/>} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App