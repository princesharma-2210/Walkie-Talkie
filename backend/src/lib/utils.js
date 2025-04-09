import jwt from "jsonwebtoken"

export const generateToken =(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    // res.cookie("jwt",token,{
    //     maxAge:7*24*60*60*1000,
    //     httpOnly:true, //prevent XSS attaks cross-site scripting attacks
    //     sameSite:"strict", //  CSRF attacks cross-site request forgery attacks
    //     secure: process.env.NODE_ENV!=="development"
    // })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,         // ✅ use true only in production (HTTPS)
        sameSite: "lax",       // ✅ allows sending from different port (e.g. 5173 -> 5000)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      

    return token;
}