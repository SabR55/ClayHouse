import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/home'
import Register from './pages/Register'
import Profile from './pages/UserProfile'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
      </Route>
    </Routes>
    
  )
}

export default App
