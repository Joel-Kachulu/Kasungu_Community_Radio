import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddArticles from './components/Add-article';
import UpdateArticle from './components/Update-article';
import AllArticles from './pages/All-Articles';
import Dashboard from './pages/Dashboard';
import RegisterUser from './components/Register';
import LoginUser from './components/Login';
import FullNews from './components/FullNews';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-article" element={<AddArticles />} />
          <Route path="/update-article" element={<UpdateArticle />} />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/news/:id" element={<UpdateArticle />} />
          <Route path="/news/:id" element={<FullNews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;