import { Post } from '../Models/post.model.js';

export const GetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author', 'username'); // Populate author with username
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
