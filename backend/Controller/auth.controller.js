import User from "../Model/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body?.userData;
//     if (!email || !password) {
//       return res.json({ success: false, error: "All fields are required." });
//     }

//     const isUserExists = await User.findOne({ email: email  });
//     if (!isUserExists) {
//       return res.json({ success: false, error: "Email not found." });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       isUserExists.password
//     );
//     console.log(isPasswordCorrect, "isPasswordCorrect");
//     if (!isPasswordCorrect) {
//       return res.json({ success: false, error: "Password is wrong." });
//     }
//     const userData = {
//       name: isUserExists.name,
//       username: isUserExists.username,
//       email: isUserExists.email,
//       role: "user",
//       userId : isUserExists._id
//     };

//     const token = await jwt.sign(
//       { userId: isUserExists._id },
//       process.env.JWT_SECRET
//     );

//     res.cookie("token", token);
//     return res.json({
//       success: true,
//       message: "Login successfull.",
//       userData,
//     });
//   } catch (error) {
//     return res.json({ success: falsse, error: error });
//   }
// };

// export const Register = async (req, res) => {
//   try {
//     const { name, email, password,username } = req.body.userData;
//     if (!name || !email || !password || !username) {
//       return res.json({ success: false, error: "All fields are required." });
//     }
//     const isEmailExist = await User.findOne({ email: email });
//     console.log(isEmailExist, "isEmailExist");
//     if (isEmailExist) {
//       return res.json({
//         success: false,
//         error: "Email is exists, please use another one.",
//       });
//     }

//     const isUserNameExist = await User.findOne({  username:username});
//     console.log(isUserNameExist, "isUserNameExist");
//     if (isUserNameExist) {
//       return res.json({
//         success: false,
//         error: "UserName is exists, please use another one.",
//       });
//     }

//     const encryptedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name: name,
//       username:username,
//       email: email,
//       password: encryptedPassword,
//     });

//     const responseFromDb = await newUser.save();

//     return res.json({
//       success: true,
//       message: " Successfull Sing up.",
//     });
//   } catch (error) {
//     console.log(error, "error");
//     return res.json({ error: error, success: false });
//   }
// };




// export const getCurrentUser = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//       const user = await User.findById(data?.userId);
//       if (!user) {
//         return res.json({ success: false });
//       }
//       const userData = {
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         role: "user",
//         userId: user._id,
//       };
//       return res.json({ success: true, userData });
    
//   } catch (error) {
//     return res.json({ success: false, error });
//   }
// };

// export const Logout = async (req, res) => {
//   try {
//       res.clearCookie("token");
//       return res.json({ success: true, message: "Logged out successfully." });
//   } catch (error) {
//       return res.json({ success: false, error });
//   }
// };

export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Follow a user
export const Follow = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow.followers.includes(user._id)) {
      userToFollow.followers.push(user._id);
      await userToFollow.save();

      user.following.push(userToFollow._id);
      await user.save();

      res.json({ message: "User followed successfully" });
    } else {
      res.status(400).json({ message: "Already following this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
