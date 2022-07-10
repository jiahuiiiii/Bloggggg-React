import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Index from './page/Index';
import Create from './page/Create';
import 'react-toastify/dist/ReactToastify.css';
import Article from './page/Article';

function App() {
  const notifyFinish = () => {
    toast.suceess('Article created!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create notifyFinish={notifyFinish} />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
