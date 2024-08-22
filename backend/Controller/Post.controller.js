import Post from "../Model/Post.model.js";

export const AllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json({ success: true, posts });
  } catch (error) {
    return res.json({ error, success: false });
  }
};


export const NewPost = async (req, res) => {
  try {
    const { image ,caption} = req.body.postData;
    const { userId } = req.body;
    if ( !image || !caption || !userId ) {
      return res.json({ success: false, error: "All fields are required." });
    }
    

    const newPost = new Post({
      image,
      caption,
      creatorId: userId,
    });
    await newPost.save();

    return res.json({
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};




  
  
  