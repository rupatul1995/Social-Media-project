import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";
import getDataUri from "../utils/datauri.js";



export const Register = async (req, res) => {
    try {
      const { username, email, password} = req.body.userData;
      if (!username || !email || !password  ) {
        return res.json({ success: false, message: "All fields are required." });
      }
      const user = await User.findOne({ email: email });
      console.log(user, "user");
      if (user) {
        return res.json({
          success: false,
          error: "Email is exists, please use another one.",
        });
      }
  
      const isUserName = await User.findOne({  username:username});
      console.log(isUserNameExist, "isUserNameExist");
      if (isUserNameExist) {
        return res.json({
          success: false,
          error: "UserName is exists, please use another one.",
        });
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username:username,
        email: email,
        password: encryptedPassword,
      });
  
      const responseFromDb = await newUser.save();
  
      return res.json({
        success: true,
        message: " Successfully Sing up.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };
  


export const Login= async (req ,res)=>{
    try {
        const{email ,password}= req.body;
        if(!email || !password){
            return res.json ({ message:"All fields are required" ,success:false,});
    }
    let user = await User.findOne({email});
    if(!user){
        return res.json({message:"Incorrect email or password"});
    }
    const isPasswordMatch =await bcrypt.compare(password , user.password);
    if(!isPasswordMatch){
        return res.json({message:"Incorrect email or password"});
    }

user ={
    _id:user._id,
    username:user.username,
    email:user.email,
    profilePicture:user.profilePicture,
    bio:user.bio,
    followers:user.followers,
    following:user.following,
    posts:user.posts
}

    const token = await jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
      );

      res.cookie("token", token);
      return res.json({
        success: true,
        message:`Welcome Back ${user.username}`,
        
      });
    } catch (error) {
        console.log(error);
    }
}



export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        return res.json({ success: false, error });
    }
  };


  export const  getProfile = async (req ,res) =>{
    try {
        const userId = req.params.id;
       let user= await User.findById(userId);
       return res.json({user ,success:true});
    } catch (error) {
        console.log(error ,"error");
    }
  };


  export const editProfile =async(req ,res) =>{
    try{
        const userId =req.id;
        const{bio}=req.body;
        const profilePicture=req.file;
        let cloudResponse;

        if(profilePicture){
            const fileUri=getDataUri(profilePicture);
             cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user= await User.findById(userId);
        if(!user){
            return res.json({message: 'User not found.' ,success:false});
        }

        if (bio)user.bio=bio;
        if (profilePicture) user.profilePicture=cloudResponse.secure_url;
        await user.save();

        return res.json({message: 'Profile updated.' ,success:true ,user});

    }catch(error){
        console.log(error,"error");
    }
  };


  export const getSuggestedUsers =async (req ,res )=>{
    try {
        const SuggestedUsers =await User.find({_id:{$ne:req.id}}).select("-password");
        if(!SuggestedUsers){
         return res.json({message:'Currently do not have any users'})
        };
        return res.json({success:true , users:suggestedUsers})
        
    } catch (error) {
        console.log(error ,"error");
    }
  }


  export const followOrUnfollow =async (req ,res)=>{
    try {
        const followkarnewala=req.id;
        const jiskofollowKrunga =req.params.id;
        if(followkarnewala=== jiskofollowKrunga){
            return res.json({message:"You cannot follow/unfollow yourself" , success:false });
        }
        const user =await User.findById(followkarnewala);
        const targetUser =await User.findById(jiskofollowKrunga);
        if(!user || !targetUser){
            return res.json({ message:'user not found', success:false});

        }

        const isFollowing= user.following.includes(jiskofollowKrunga);
        if(isFollowing){
            await Promise.all([
                User.updateOne({_id:followkarnewala},{$pull:{following:jiskofollowKrunga}}),
                User.updateOne({_id:jiskofollowKrunga},{$pull:{followers:followkarnewala}}),
            ])
        
        }else{
            await Promise.all([
                User.updateOne({_id:followkarnewala},{$push:{following:jiskofollowKrunga}}),
                User.updateOne({_id:jiskofollowKrunga},{$push:{followers:followkarnewala}}),
            ]);
            return res.json({ message: "Unfollowed successfully" ,success:true});
        }
    } catch (error) {
        console.log(error, "error");
    }
  }




