import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import HomePage from './pages/Home';
import './index.css';
import StateDetailsPage from './pages/StateDetailsPage';
import HighCaseAndDeaths from './pages/HighCase&Deaths';
import AddData from './pages/AddData';  


function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/state/:stateName" element={<StateDetailsPage />} />
          <Route path="/highcase" element={<HighCaseAndDeaths />} />
          <Route path="/add" element={<AddData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;