import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Api from '../axiosConfig';
import { AuthContext } from '../context/auth.context';
import '../style/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await Api.get('/post/all');
      if (response.data.success) {
        setAllPosts(response.data.posts);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await Api.post('/auth/logout');
      if (response.data.success) {
        dispatch({ type: 'LOGOUT' });
        router('/login');
        toast.success(response.data.message);
      } else {
        toast.error('Logout failed.');
      }
    } catch (error) {
      toast.error('Failed to logout.');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mainhomepage">

    <div className="navbar">
    <h1 className="logo">Instagram</h1>

   <div className="Home">
   <div className="Home1">
   <i class="fa-solid fa-house"></i>
   </div>
   <div className="Home2">
    <p onClick={() => router("/")}>Home
    </p>
   </div>
   </div>
  
  
   <div className="Search">
   <div className="Search1">
   <i class="fa-solid fa-magnifying-glass"></i>
   </div>
   <div className="Search2">
    <p>Search</p>
   </div>
   </div>
    
   <div className="Explore">
   <div className="Explore1">
    <i class="fa-regular fa-compass"></i>
   </div>
   <div className="Explore2">
    <p>Explore</p>
   </div>
   </div>
   
   <div className="Reels">
   <div className="Reels1">
   <i class="fa-solid fa-play"></i>
    
   </div>
   <div className="Reels2">
    <p>Reels</p>
   </div>
   </div>


   <div className="Messages">
   <div className="Messages1">
   <i class="fa-solid fa-message"></i>
    
   </div>
   <div className="Messages2">
    <p>Messages</p>
   </div>
   </div>
   
   <div className="Notifications">
   <div className="Notifications1">
   <i class="fa-regular fa-heart"></i>
    
   </div>
   <div className="Notifications2">
    <p>Notifications</p>
   </div>
   </div>


   
   <div className="Create">
   <div className="Create1">
   <i class="fa-regular fa-square-plus"></i>
    
   </div>
   <div className="Create2">
    <p onClick={() => router("/add-post")}>Create</p>
   </div>
   </div>

   
   <div className="Profile">
   <div className="Profile1">
   <i class="fa-regular fa-user"></i>
    
   </div>
   <div className="Profile2">
    <p>Profile</p>
   </div>
   </div>


   
   <div className="More">
   <div className="More1">
   <i class="fa-solid fa-bars"></i>
    
   </div>
   <div className="More2">
    <p>More</p>
   </div>
   </div>

   <div className="logout">
   <div className="logout1">
   <i class="fa-regular fa-user"></i>
    
   </div>
   <div className="logout2" onClick={handleLogout}>
    <p>Logout</p>
   </div>
   </div>

    </div>


      {loading ? (
        <div className="instagramlogo">Loading...</div>
      ) : (
        <div className="postMainDiv">
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="postimage"
              onClick={() => router(`/post/${post._id}`)}
            >
                <div className="postHeader">
                <span className="username">{post.author.username}</span>
              </div>
              <img className="postimagesize" src={post.image} alt={post.caption} />
              <p>{post.caption}</p>
              {/* Add comment input if needed */}
            </div>
          ))}
        </div>
      )}
      <div className="SuggestDiv">
        <h1> {state?.user?.username}</h1>
        <h1>Suggested for you</h1>
        <label>usernames following</label>
      </div>
    </div>
  );
};

export default Home;



