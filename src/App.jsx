import React, { useEffect, useState } from 'react'

import Home from './Pages/home';
import { Route, Routes } from 'react-router-dom';
import SelectedFlights from './Pages/selectedFlights';

function App() {

  return (
    <div className=' min-h-screen w-full'>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/selectedFlights" element={<SelectedFlights />}></Route>
        <Route path="*" element={<div>You are in the wrong page</div>}></Route>
      </Routes>
    </div >

  )
}

export default App