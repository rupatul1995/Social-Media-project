import jwt from "jsonwebtoken";
import User from "../Models/auth.model.js";

export async function isAuthenticated(req, res, next) {
  try {
    // console.log("inside middleware");
    const token = req.cookies.token;
    // console.log(token, "token");
    // console.log(process.env.JWT_SECRET, "process.env.JWT_SECRET");
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data,"data")
    const user = await User.findById(data?.userId);
    if (!user) {
      return res.json({ success: false, error: "User not valid." });
    }
    req.userId = data.userId;
    next();
  } catch (error) {
    console.log(error, "error jere");
    return res.json({ success: false, error });
  }
}


export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};
export default isAuthenticated;