import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({

<<<<<<< HEAD
    image: String,
    caption: String,
    creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
=======
    caption: {type:String , default:""},
    image :{type:String , required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId ,ref:"User"}],
    comments:[{type:mongoose.Schema.Types.ObjectId , ref:'Comment'}],

    // creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
>>>>>>> 677fdeaa109d5ebaab51414143b7c288e7766522

    

});

<<<<<<< HEAD
const Post = model("post", postSchema);
=======
const Post = model("Post", postSchema);
>>>>>>> 677fdeaa109d5ebaab51414143b7c288e7766522

export default Post;