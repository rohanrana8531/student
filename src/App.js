import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Students from './pages/Students'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Students />}/>
      </Routes>
    </Router>
  )
}

export default App