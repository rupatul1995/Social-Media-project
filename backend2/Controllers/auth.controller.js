import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/auth.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body?.userData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      return res.json({ success: false, error: "Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordCorrect, "isPasswordCorrect");
    if (!isPasswordCorrect) {
      return res.json({ success: false, error: "Password is wrong." });
    }
    const userData = {
      name: isUserExists.name,
      username:isUserExists.username,
      email: isUserExists.email,
      role: "user",
      userId : isUserExists._id
    };

    const token = await jwt.sign(
      { userId: isUserExists._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    return res.json({
      success: true,
      message: "Login successfull.",
      userData,
    });
  } catch (error) {
    return res.json({ success: falsse, error: error });
  }
};



export const Register = async (req, res) => {
  try {
    const { name, email, password,username } = req.body.userData;
    if (!name || !email || !password || !username) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const isEmailExist = await User.findOne({ email: email });
    console.log(isEmailExist, "isEmailExist");
    if (isEmailExist) {
      return res.json({
        success: false,
        error: "Email is exists, please use another one.",
      });
    }

    const isUserNameExist = await User.findOne({  username:username});
    console.log(isUserNameExist, "isUserNameExist");
    if (isUserNameExist) {
      return res.json({
        success: false,
        error: "UserName is exists, please use another one.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username:username,
      email: email,
      password: encryptedPassword,
    });

    const responseFromDb = await newUser.save();

    return res.json({
      success: true,
      message: " Successfull Sing up.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};


export const Logout = async (req, res) => {
  try {
      res.clearCookie("token");
      return res.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
      return res.json({ success: false, error });
  }
};



export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.userId);
    if (!user) {
      return res.json({ success: false, error: "User not found." });
    }
    const userData = {
      _id:user._id,
    username:user.username,
    email:user.email,
    profilePicture:user.profilePicture,
    bio:user.bio,
    followers:user.followers,
    following:user.following,
    posts:user.posts
    };
    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};


export const  getProfile = async (req ,res) =>{
  try {
      const userId = req.params.id;
     const user= await User.findById(userId).select('-password');
     return res.json({user ,success:true});
  } catch (error) {
      console.log(error ,"error");
  }
};



export const editProfile = async (req, res) => {
  try {
      const userId = req.id;
      const { bio } = req.body;
      const profilePicture = req.file;
      let cloudResponse;

      if (profilePicture) {
          const fileUri = getDataUri(profilePicture);
          cloudResponse = await cloudinary.uploader.upload(fileUri);
      }

      const user = await User.findById(userId).select('-password');
      if (!user) {
          return res.json({message: 'User not found.',success: false});
      };
      if (bio) user.bio = bio;
      if (profilePicture) user.profilePicture = cloudResponse.secure_url;

      await user.save();

      return res.json({message: 'Profile updated.', success: true, user });

  } catch (error) {
      console.log(error);
  }
};



export const getSuggestedUsers = async (req, res) => {
  try {
      const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
      if (!suggestedUsers) {
          return res.status(400).json({
              message: 'Currently do not have any users',
          })
      };
      return res.status(200).json({
          success: true,
          users: suggestedUsers
      })
  } catch (error) {
      console.log(error);
  }
};
export const followOrUnfollow = async (req, res) => {
  try {
      const followKrneWala = req.id; // patel
      const jiskoFollowKrunga = req.params.id; // shivani
      if (followKrneWala === jiskoFollowKrunga) {
          return res.status(400).json({
              message: 'You cannot follow/unfollow yourself',
              success: false
          });
      }

      const user = await User.findById(followKrneWala);
      const targetUser = await User.findById(jiskoFollowKrunga);

      if (!user || !targetUser) {
          return res.status(400).json({
              message: 'User not found',
              success: false
          });
      }
      // mai check krunga ki follow krna hai ya unfollow
      const isFollowing = user.following.includes(jiskoFollowKrunga);
      if (isFollowing) {
          // unfollow logic ayega
          await Promise.all([
              User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
              User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'Unfollowed successfully', success: true });
      } else {
          // follow logic ayega
          await Promise.all([
              User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
              User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'followed successfully', success: true });
      }
  } catch (error) {
      console.log(error);
  }
}