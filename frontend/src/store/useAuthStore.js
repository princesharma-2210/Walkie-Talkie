import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import axios from "axios";
import { FastForward } from "lucide-react";

export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try{
            const res= await axiosInstance.get("/auth/check");
            
            set({authUser:res.data});
        }catch(error){
            console.log("Error in checkAuth:",error.response?.data?.message)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async (data)=>{
        // console.log("Data sent to /auth/signup:", data);
        set({isSigningUp:true});
        try{
            // toast.success("Account created successfully");
            const res=await axiosInstance.post("/auth/signup",data);
            console.log("res:",res);
            set({authUser: res.data});
            toast.success("Account created successfully");
            
        }catch (error){
            toast.error(error.response?.data?.message || "Signup failed");
        }finally {
            set({isSigningUp:false});
        }
    },
    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
            toast.success("Account successfully reopen");
        }catch(error){
            toast.error(error.response?.data?.message || "Signup failed");
        }finally {
            set({isLoggingIn:false});
        }
    },
    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try{
            const res= await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        }catch(error){
            console.log("error in update profile: ",error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    },

}));