/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';
import Index from './page/Index';
import Create from './page/Create';
import 'react-toastify/dist/ReactToastify.css';
import Article from './page/Article';
import Edit from './page/Edit';
import Login from './page/Login';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('isAuth');
      setIsAuth(false);
      toast.success('You have been signed out');
      window.location.pathname = '/login';
    });
  };
  const notifyFinish = () => {
    toast.success('Article created!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
    });
  };
  return (
    <div className="App w-full overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Index isAuth={isAuth} signUserOut={signUserOut} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/create" element={<Create notifyFinish={notifyFinish} isAuth={isAuth} />} />
          <Route path="/edit/:id" element={<Edit notifyFinish={notifyFinish} />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
