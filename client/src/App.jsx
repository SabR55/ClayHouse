import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import ProfileSection from './pages/ProfileSection'
import TrialClass from './pages/TrialClass'
import TrialClassNewUser from './pages/TrialClassNewUser'
import RegularWorkshops from './pages/RegularWorkshops'
import Payment from './pages/Payment'
import ErrorPage from './pages/ErrorPage'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import axios from 'axios'




axios.defaults.baseURL = 'http://localhost:3000';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register />} />

        {/* Profile and its nested routes */}
        <Route path="profile" element={<UserProfile />}>
          <Route path=":section" element={<ProfileSection />} />
        </Route>

        <Route path="/trial-class" element={<TrialClass />} />
        <Route path="/trial-class-new-user" element={<TrialClassNewUser />} />
        <Route path="/regular-workshops" element={<RegularWorkshops />} />
        <Route path="/workshop-payment" element={<Payment />} />
        <Route path="/errorPage" element={<ErrorPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>
    </Routes>
    
  )
}

export default App
