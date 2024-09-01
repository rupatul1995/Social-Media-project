const PostCard = ({ post }) => {
    return (
      <div className="post-card">
        <div className="post-author">
          <img src={post.author.profilePicture} alt={post.author.username} />
          <p>{post.author.username}</p>
        </div>
        <img src={post.image} alt="Post" />
        <p>{post.caption}</p>
      </div>
    );
  };
  
  export default PostCard;