import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup= async (req,res)=>{
    const {fullName, email, password}= req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All field required"})
        }
        if(password.length<5){
            return res.status(400).json({message:"password must be at least 5 character"})
        }
        const user= await User.findOne({email})
        if(user) return res.status(400).json({message:"Email already exists"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser= new User({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }
    catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const signin=async (req,res)=>{
    const {email, password}= req.body;
    try{
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentail"})
        }
        let isPasswordCorrect= bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Wrong Password"})
        }
        generateToken(newUser._id,res)
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        });
    }catch(error){
        console.log("Error in signin controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }catch(error){
        console.log("Error in logout controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
    res.send("signup route");
}

export const updateProfile=async (req,res)=>{
    
    try{
        const {profilePic}= req.body;
        const userId= req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Profilepic is required"})
        }
        const uploadResponse= await cloudinary.uploader.upload(profilePic)
    

        const updatedUser= await User.findByIdAndUpdate(user._id,{
            profilePic:uploadResponse.secure_url
        },{new:true})
        res.status(200).json(updatedUser)
    }
    catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}

// export 