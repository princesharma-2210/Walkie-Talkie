import Navbar from "./components/Navbar"

import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore.js"
import { useThemeStore } from "./store/useThemeStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"


function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}= useAuthStore();
  const {theme}=useThemeStore();
  console.log({onlineUsers})
  useEffect(()=>{
    checkAuth({onlineUsers});
    document.documentElement.setAttribute("data-theme", theme);
  },[checkAuth, theme]);
  console.log({authUser});

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
    {/* <div>hbedhbe</div> */}

      <Navbar/>
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
