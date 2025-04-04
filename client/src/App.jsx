import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import TrialClass from './pages/TrialClass'
import RegularWorkshops from './pages/RegularWorkshops'
import ErrorPage from './pages/ErrorPage'
import axios from 'axios'



axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/trial-class" element={<TrialClass />} />
        <Route path="/regular-workshops" element={<RegularWorkshops />} />
        <Route path="/errorPage" element={<ErrorPage />} />
      </Route>
    </Routes>
    
  )
}

export default App
