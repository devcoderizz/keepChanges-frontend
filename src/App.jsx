import {Routes, Route, Navigate} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Fundraisers from './pages/Fundraisers'
import AuthPage from './pages/AuthPage'
import StartFundraiser from "./pages/StartFundraiser"
import Footer from "./components/Footer"


function App() {


  return (
    <div className=" w-full  bg-[#FFF1F1] ">
    <Navbar />
  <Routes>
      <Route path="/" element={  <HomePage/> } ></Route>
      <Route path="/fundraisers" element={<Fundraisers/> } ></Route>
      <Route path='/auth' element={<AuthPage/>} />
      <Route path='/startFundraiser' element={<StartFundraiser/>} />
      <Route path='/fundraiser/:id' element={<Fundraisers/>} />
      



      <Route path="*" element={ <Navigate to="/" /> }  />


  </Routes>
  <Footer/>
  </div>
  )
}

export default App
