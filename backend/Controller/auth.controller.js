import User from "../Model/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body?.userData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await User.findOne({ email: email  });
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
    const isEmailExist = await User.findOne({ email: email , username:username});
    console.log(isEmailExist, "isEmailExist");
    if (isEmailExist) {
      return res.json({
        success: false,
        error: "Email is exists, please use another one.",
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




export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
      const user = await User.findById(data?.userId);
      if (!user) {
        return res.json({ success: false });
      }
      const userData = {
        name: user.name,
        email: user.email,
        role: "user",
        userId: user._id,
      };
      return res.json({ success: true, userData });
    
  } catch (error) {
    return res.json({ success: false, error });
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