import Post from "../Model/Post.model.js"

export const AllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('creatorId', 'username');
    res.json({ success: true, posts });
  } catch (error) {
    return res.json({ error, success: false });
  }
};


export const NewPosts = async (req, res) => {
  try {
    const {  image , caption} = req.body.postData;
    const { userId } = req.body;
    if (!image || !caption ) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const newPost = new Post({
      image: image,
      caption: caption,
      creatorId: userId,
    });
    await newPost.save();
    return res.json({ success: true, message: "Post created successfully." });
  } catch (error) {
    return res.json({ error: error.message, success: false });
  }
};


//     const isPostExist = await Post.findOne({
//       image,
//       caption,
//       creatorId: userId,
//       // creatorname:
//     });
//     if (isPostExist) {
//       return res.json({ success: false, error: "post is already exists." });
//     }

//     const newPost = new Post({
     
//       image:image,
//       caption:caption,
//       creatorId: userId,
//     });
//     await newPost.save();

//     return res.json({
//     });
//   } catch (error) {
//     console.log(error, "error");
//     return res.json({ error: error, success: false });
//   }
// };



export const search = async (req, res) => {
  try {
    const { searchedWord } = req.body;

    const searchedrecipes = await Recipe.find({
      $or:[{username: { $regex: searchedWord, $options: "i" }}]
      
    });
    res.json({ success: true, searchedrecipes });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};
  
  



// export const AddPost = async (req, res) => {
//   const { userId, content } = req.body;
//   try {
//     const post = new Post({ user: userId, content });
//     await post.save();
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(400).json({ error: "Error creating post" });
//   }
// };


// export const Feed = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate("following");
//     const posts = await Post.find({
//       user: { $in: user.following },
//     })
//       .sort({ timestamp: -1 })
//       .populate("user");

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching feed" });
//   }
// };



// export const Like = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post.likes.includes(req.user.id)) {
//       post.likes.push(req.user.id);
//       await post.save();
//       res.json({ message: "Post liked successfully" });
//     } else {
//       res.status(400).json({ message: "Already liked this post" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };


// export const Comment = async (req, res) => {
//   const { content, userId } = req.body;
//   try {
//     const post = await Post.findById(req.params.id);
//     post.comments.push({ user: userId, content });
//     await post.save();
//     res.json({ message: "Comment added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
