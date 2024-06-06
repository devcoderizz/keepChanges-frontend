import {Routes, Route, Navigate} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Fundraisers from './pages/Fundraisers'
import AuthPage from './pages/AuthPage'
import StartFundraiser from "./pages/StartFundraiser"
import Footer from "./components/Footer"
import { useRecoilValue } from "recoil"
import { userAtom } from "./atom/userAtom"
import UserProfile from "./pages/UserProfile"
import ActiveFundraisers from "./pages/ActiveFundraisers"
import ScrollToTop from "./components/ScrollToTop"
import UserUpdate from "./pages/UserUpdate"
import AdminDashboard from "./pages/AdminDashboard"
import Dashboard from "./components/AdminDashboard/Dashboard"



function App() {
  const user = useRecoilValue(userAtom)
  

  return (
    <div className=" w-full  bg-[#FFF1F1] ">
    <Navbar/>
    <ScrollToTop/>

  <Routes>
    

      <Route path="/" element={  <HomePage/> } ></Route>
      <Route path='/auth' element={!user ? <AuthPage/> : <Navigate to={'/'} /> } />
      <Route path='/startFundraiser' element={<StartFundraiser/>} />
      <Route path='/user-profile/:id' element={<UserProfile/>} />
      <Route path='/fundraisers/:id' element={<Fundraisers/>} />
      <Route path='/all-fundraisers/:id?' element={<ActiveFundraisers/>} />
      <Route path='/user-update' element={<UserUpdate/>} />
      <Route path='/AdminDashbaord' element={<AdminDashboard/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      
      <Route path="*" element={ <Navigate to="/" /> }  />


  </Routes>
  
  <Footer/>
  
  </div>
  )
}

export default App
