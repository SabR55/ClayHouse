import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/home'
import Register from './pages/Register'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register />}/>
      </Route>
    </Routes>
    
  )
}

export default App
