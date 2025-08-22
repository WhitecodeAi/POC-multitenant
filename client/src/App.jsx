import { useState } from 'react'
//test gitlab to github import 
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import FacultyPage from './Pages/FacultyPage'; // adjust path as needed


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <h3>Welcome 2</h3>
      <Routes>
         
        <Route  path="/:tenant" element={<FacultyPage />} />
      </Routes>
    </Router>
  )
}

export default App
