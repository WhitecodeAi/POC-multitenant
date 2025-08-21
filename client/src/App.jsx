import { useState } from 'react'
 
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacultyPage from './Pages/FacultyPage'; // adjust path as needed


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/anc" replace />} />
        <Route  path="/:tenant" element={<FacultyPage />} />
      </Routes>
    </Router>
  )
}

export default App
