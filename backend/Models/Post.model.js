import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    caption: {type:String , default:""},
    image :{type:String , required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId ,ref:"User"}],
    comments:[{type:mongoose.Schema.Types.ObjectId , ref:'Comment'}],

    // creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }


    

});

const Post = model("Post", postSchema);


export default Post;