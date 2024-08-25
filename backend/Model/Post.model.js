import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({

    image: String,
    caption: String,
    creatorname: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }

    

});

const Post = model("post", postSchema);

export default Post;