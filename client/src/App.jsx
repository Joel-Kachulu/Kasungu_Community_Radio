import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Entertainment from './pages/Entertainment';
import Sports from './pages/Sports';
import Other from './pages/Other';
import National from './pages/National';
import Business from './pages/Business';
import Health from './pages/Health';
import Politics from './pages/Politics';
import Home from './pages/Home';
import FullNews from './components/FullNews';
import SearchResults from './components/SearchResults';

import NewsCategoryPage from './components/CategoryPage';


function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/National" element={<National />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/Entertainment" element={<Entertainment />} />
          <Route path="/Politics" element={<Politics />} />
          <Route path="/Business" element={<Business />} />
          <Route path="/Health" element={<Health />} />
          <Route path="/Other" element={<Other />} />
          <Route path="/news/:id" element={<FullNews />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/news/category/:category" element={<NewsCategoryPage />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
