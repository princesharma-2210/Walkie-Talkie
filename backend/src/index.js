
import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors"


const app= express();
app.use(express.json()); 
app.use(cookieParser());
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.listen(port,()=>{
    console.log("connection on port:"+port)
    connectDB(); 
})

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes)