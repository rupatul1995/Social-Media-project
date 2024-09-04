import { Post } from '../Models/post.model.js';


export const GetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'username profilePhoto') // Adjust as needed to include author info
      .sort({ createdAt: -1 }) // Sort posts by creation date in descending order
      .exec();
    res.json({ success: true, posts });
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};

export const CreateNewPost = async (req, res) => {
  try {
    const { image, caption } = req.body.postData;
    const { userId } = req.body;

    if (!image || !caption || !userId) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const newPost = new Post({
      image,
      caption,
      author: userId, // Link the post to the user
    });

    await newPost.save();
    res.json({ success: true, message: 'Post created successfully.' });
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};




export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.find({ author: userId });
    console.log(post);
    return res.json({ success: true, post });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};



export const GetLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.aggregate([
      {
        $sort: { createdAt: -1 } // Sort posts by creation date in descending order
      },
      {
        $limit: 4 // Limit the number of posts to 4
      },
      {
        $lookup: {
          from: 'users', // The collection where user data is stored
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true // Include posts even if no author details are found
        }
      },
      {
        $lookup: {
          from: 'comments', // The collection where comments are stored
          localField: '_id',
          foreignField: 'postId',
          as: 'comments'
        }
      },
      {
        $addFields: {
          averageLikes: {
            $cond: {
              if: { $gt: [{ $size: '$likes' }, 0] },
              then: { $size: '$likes' },
              else: 0
            }
          },
          commentCount: { $size: '$comments' } // Add a field for the number of comments
        }
      },
      {
        $project: {
          'authorDetails.password': 0, // Exclude sensitive information
          'authorDetails.email': 0, // Exclude sensitive information
          comments: 0 // Exclude comments if you don’t want to send them in the response
        }
      }
    ]);

    res.json({ success: true, posts: latestPosts });
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};





export const LikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.json({ success: false, error: 'Post ID and User ID are required.' });
    }

    // Check if the user has already liked the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({ success: false, error: 'Post not found.' });
    }

    const hasLiked = post.likes.includes(userId);
    
    if (hasLiked) {
      // If already liked, remove the like
      post.likes.pull(userId);
    } else {
      // If not liked, add the like
      post.likes.push(userId);
    }

    await post.save();
    
    res.json({ success: true, likes: post.likes.length });
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};


































// export const getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).populate('posts');

//     if (!user) {
//       return res.status(404).json({ success: false, error: 'User not found.' });
//     }

//     const userData = {
//       name: user.name,
//       username: user.username,
//       posts: user.posts,
//     };

//     return res.json({ success: true, userData });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };










// export const getUserPost = async (req, res) => {
//     try {
//         const authorId = req.id;
//         const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
//             path: 'author',
//             select: 'username, profilePicture'
//         }).populate({
//             path: 'comments',
//             sort: { createdAt: -1 },
//             populate: {
//                 path: 'author',
//                 select: 'username, profilePicture'
//             }
//         });
//         return res.status(200).json({
//             posts,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const likePost = async (req, res) => {
//     try {
//         const likeKrneWalaUserKiId = req.id;
//         const postId = req.params.id; 
//         const post = await Post.findById(postId);
//         if (!post) return res.status(404).json({ message: 'Post not found', success: false });

//         // like logic started
//         await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
//         await post.save();

//         // implement socket io for real time notification
//         const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
         
//         const postOwnerId = post.author.toString();
//         if(postOwnerId !== likeKrneWalaUserKiId){
//             // emit a notification event
//             const notification = {
//                 type:'like',
//                 userId:likeKrneWalaUserKiId,
//                 userDetails:user,
//                 postId,
//                 message:'Your post was liked'
//             }
//             const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//             io.to(postOwnerSocketId).emit('notification', notification);
//         }

//         return res.status(200).json({message:'Post liked', success:true});
//     } catch (error) {

//     }
// }
// export const dislikePost = async (req, res) => {
//     try {
//         const likeKrneWalaUserKiId = req.id;
//         const postId = req.params.id;
//         const post = await Post.findById(postId);
//         if (!post) return res.status(404).json({ message: 'Post not found', success: false });

//         // like logic started
//         await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
//         await post.save();

//         // implement socket io for real time notification
//         const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
//         const postOwnerId = post.author.toString();
//         if(postOwnerId !== likeKrneWalaUserKiId){
//             // emit a notification event
//             const notification = {
//                 type:'dislike',
//                 userId:likeKrneWalaUserKiId,
//                 userDetails:user,
//                 postId,
//                 message:'Your post was liked'
//             }
//             const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//             io.to(postOwnerSocketId).emit('notification', notification);
//         }



//         return res.status(200).json({message:'Post disliked', success:true});
//     } catch (error) {

//     }
// }
// export const addComment = async (req,res) =>{
//     try {
//         const postId = req.params.id;
//         const commentKrneWalaUserKiId = req.id;

//         const {text} = req.body;

//         const post = await Post.findById(postId);

//         if(!text) return res.status(400).json({message:'text is required', success:false});

//         const comment = await Comment.create({
//             text,
//             author:commentKrneWalaUserKiId,
//             post:postId
//         })

//         await comment.populate({
//             path:'author',
//             select:"username profilePicture"
//         });
        
//         post.comments.push(comment._id);
//         await post.save();

//         return res.status(201).json({
//             message:'Comment Added',
//             comment,
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// };
// export const getCommentsOfPost = async (req,res) => {
//     try {
//         const postId = req.params.id;

//         const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

//         if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

//         return res.status(200).json({success:true,comments});

//     } catch (error) {
//         console.log(error);
//     }
// }
// export const deletePost = async (req,res) => {
//     try {
//         const postId = req.params.id;
//         const authorId = req.id;

//         const post = await Post.findById(postId);
//         if(!post) return res.status(404).json({message:'Post not found', success:false});

//         // check if the logged-in user is the owner of the post
//         if(post.author.toString() !== authorId) return res.status(403).json({message:'Unauthorized'});

//         // delete post
//         await Post.findByIdAndDelete(postId);

//         // remove the post id from the user's post
//         let user = await User.findById(authorId);
//         user.posts = user.posts.filter(id => id.toString() !== postId);
//         await user.save();

//         // delete associated comments
//         await Comment.deleteMany({post:postId});

//         return res.status(200).json({
//             success:true,
//             message:'Post deleted'
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }
