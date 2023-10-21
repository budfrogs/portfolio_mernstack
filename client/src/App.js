import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import Navbar from './components/navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
