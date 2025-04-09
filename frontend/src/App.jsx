import Navbar from "./components/Navbar"

import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Navigate } from 'react-router-dom';

function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore()
  useEffect(()=>{
    checkAuth()

  },[checkAuth]);
  console.log({authUser});

  if(!isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>

    </div>
  )
  return (
    <>
    {/* <div>hbedhbe</div> */}
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
