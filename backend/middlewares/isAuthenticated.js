import jwt from "jsonwebtoken";

const isAuthenticated =async(req , res , next)=>{
    try{
        const token =req.cookies.token;
        if(!token){
            return res.json({message :'User not authenticated', success:false});
        }

        const decode = await jwt.verify(token , process.env.JWT_SECRET);
        if(!decode){
            return res.json({massege:"Invalid" ,success:false});
        }
        req.id =decode.userId;
        next();
    }catch(error){
        console.log(error ,"error");

    }
}
export default isAuthenticated;