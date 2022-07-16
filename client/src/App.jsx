import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Index from './page/Index';
import Create from './page/Create';
import 'react-toastify/dist/ReactToastify.css';
import Article from './page/Article';
import Edit from './page/Edit';

function App() {
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
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create notifyFinish={notifyFinish} />} />
          <Route path="/edit/:id" element={<Edit notifyFinish={notifyFinish} />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
