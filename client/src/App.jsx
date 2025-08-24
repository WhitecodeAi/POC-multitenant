import { useState } from 'react'
//test gitlab to github import 
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import FacultyPage from './Pages/FacultyPage'; // adjust path as needed


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <h3>Multi-tenant example</h3>
      <Routes>
         
        <Route  path="/:tenant" element={<FacultyPage />} />
      </Routes>
    </Router>
  )
}

export default App
