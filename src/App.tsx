import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookPage from './pages/BookPage';
import MainPage from './pages/MainPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/book/:id' element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
