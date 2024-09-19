import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/auth.model.js";
import { Post } from "../Models/post.model.js";


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
    const { name, email, password,username ,profilePicture} = req.body.userData;
    if (!name || !email || !password || !username || !profilePicture) {
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
      profilePicture: profilePicture,
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
    // console.log(token, "token");
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    {
      const user = await User.findById(data?.userId);
      if (!user) {
        return res.json({ success: false });
      }
      const userData = {
        name: user.name,
        username:user.username,
        email: user.email,
        role: "user",
        userId: user._id,
      };
      return res.json({ success: true, userData });
    }
  } catch (error) {
    return res.json({ success: false, error });
  }
};



export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body.searchTerm;
    // Fetch user profile details
    const user = await User.findById(userId).populate('followers', 'username').populate('following', 'username');
    if (!user) {
      return res.json({ success: false, error: "User not found" });
    }

    // Fetch posts by the user
    const posts = await Post.find({ author: userId });

    return res.json({
      success: true,  
      username: user.username,
      name: user.name,
      posts: posts, 
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error.message, success: false });
  }
};


// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log(userId);
//     // Fetch posts created by the user
//     const posts = await Post.find({ author: userId });

//     return res.json({ success: true, posts });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, error: error.message });
//   }
// };



export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username _id'); // Retrieve usernames
    res.json({ success: true, users });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, error: error.message });
  }
};


export const Getsearch = async (req, res) => {
  try {
    const { searchedWord } = req.body;
    // apply search on category and tags too. use or operator
    const users = await User.find({
      username: { $regex: searchedWord, $options: "i" },
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: error, success: false });
  }
};






export const updateBio = async (req, res) => {
  try {
    const { userId, bio } = req.body;
    if (!bio) return res.json({ success: false, error: "Bio cannot be empty" });

    const updatedUser = await User.findByIdAndUpdate(userId, { bio }, { new: true });
    if (!updatedUser) return res.json({ success: false, error: "User not found" });

    res.json({ success: true, bio: updatedUser.bio });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { userId, profilePicture } = req.body;
    if (!profilePicture) return res.json({ success: false, error: "Profile picture URL cannot be empty" });

    const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });
    if (!updatedUser) return res.json({ success: false, error: "User not found" });

    res.json({ success: true, profilePicture: updatedUser.profilePicture });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId, followUserId } = req.body;

    if (userId === followUserId) return res.json({ success: false, error: "Cannot follow yourself" });

    await User.findByIdAndUpdate(userId, { $addToSet: { following: followUserId } });
    await User.findByIdAndUpdate(followUserId, { $addToSet: { followers: userId } });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId, unfollowUserId } = req.body;

    if (userId === unfollowUserId) return res.json({ success: false, error: "Cannot unfollow yourself" });

    await User.findByIdAndUpdate(userId, { $pull: { following: unfollowUserId } });
    await User.findByIdAndUpdate(unfollowUserId, { $pull: { followers: userId } });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await Post.find({ author: userId });

    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};






