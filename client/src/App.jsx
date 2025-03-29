import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/home'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import UpcomingClasses from './pages/UpcomingClasses'
import ProfileDetails from './pages/ProfileDetails'
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
        <Route path="/errorPage" element={<ErrorPage />} />
      </Route>
    </Routes>
    
  )
}

export default App
