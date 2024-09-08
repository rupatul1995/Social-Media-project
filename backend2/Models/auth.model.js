import mongoose  ,{ model, Schema } from "mongoose";

const userSchema = new Schema({
  name:{type:String , required: true , unique:true},
  username: { type: String, required: true , unique:true},
  email: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  profilePicture:{ type: String, default: "" },
  bio:{type : String  ,default: ""},
  followers: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId}],
  posts:[{type:mongoose.Schema.ObjectId ,ref:"post"}],
});

const User = model("User", userSchema);

export default User;