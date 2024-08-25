// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts, likePost } from "../actions/postActions";

// const FeedPage = () => {
//   const dispatch = useDispatch();
//   const { posts } = useSelector((state) => state.posts);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchPosts(user._id));
//     }
//   }, [user, dispatch]);

//   const handleLike = (postId) => {
//     dispatch(likePost(postId));
//   };

//   return (
//     <div>
//       <h2>Feed</h2>
//       {posts.map((post) => (
//         <div key={post._id}>
//           <h3>{post.user.username}</h3>
//           <p>{post.content}</p>
//           <button onClick={() => handleLike(post._id)}>Like</button>
//           <span>{post.likes.length} likes</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeedPage;