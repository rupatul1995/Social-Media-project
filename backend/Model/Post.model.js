import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({

    // image: String,
    // caption: String,
    // // creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    timestamp: { type: Date, default: Date.now },

});

const Post = model("post", postSchema);

export default Post;