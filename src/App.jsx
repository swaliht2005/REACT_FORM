import Form from './Form'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./table";
import './App.css'

function App() {
  

  return (
    <>
     <Router>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
    </Router>
      
    </>
  )
}

export default App


