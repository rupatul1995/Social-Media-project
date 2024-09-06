import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Api from '../axiosConfig';
import { AuthContext } from '../context/auth.context';
import '../style/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();

  // Fetch posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await Api.get('/post/all');
      if (response.data.success) {
        setAllPosts(response.data.posts);
        const userLikes = {};
        response.data.posts.forEach(post => {
          userLikes[post._id] = post.likes.includes(state?.user?._id);
        });
        setLikedPosts(userLikes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const getUsers = async () => {
    try {
      const response = await Api.get('/auth/allusers');
      if (response.data.success) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await Api.post('/auth/logout');
      if (response.data.success) {
        dispatch({ type: 'LOGOUT' });
        router('/');
        toast.success(response.data.message);
      } else {
        toast.error('Logout failed.');
      }
    } catch (error) {
      toast.error('Failed to logout.');
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const response = await Api.post('/auth/search', { searchedWord: searchTerm });
      if (response.data.success) {
        setSearchResults(response.data.users);
        setIsPopupVisible(true);
      } else {
        toast.error('Search failed.');
      }
    } catch (error) {
      toast.error('Failed to search.');
    }
  };

  // Handle like
  const handleLike = async (postId) => {
    try {
      const response = await Api.post('/post/like', { postId, userId: state?.user?.userId });
      if (response.data.success) {
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !prev[postId]
        }));
        setAllPosts((prevPosts) => 
          prevPosts.map(post => 
            post._id === postId ? { ...post, likes: response.data.likes } : post
          )
        );
      }
    } catch (error) {
      toast.error('Failed to like post.');
    }
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  return (
    <div className="mainhomepage">
      <div className="navbar">
        <h1 className="logo">Instagram</h1>

        <div className="Home">
    <div className="Home1">
      <i className="fa-solid fa-house"></i>
    </div>
    <div className="Home2">
      <p onClick={() => router("/")}>Home</p>
    </div>
  </div>

<div className="Search">
  <div className="Search1">
    <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
  </div>

          <div className="Search2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            
          </div>
          </div>
          <div className="Explore">
    <div className="Explore1">
      <i className="fa-regular fa-compass"></i>
    </div>
    <div className="Explore2">
      <p>Explore</p>
    </div>
  </div>

  <div className="Reels">
    <div className="Reels1">
      <i className="fa-solid fa-play"></i>
    </div>
    <div className="Reels2">
      <p>Reels</p>
    </div>
  </div>

  <div className="Messages">
    <div className="Messages1">
      <i className="fa-solid fa-message"></i>
    </div>
    <div className="Messages2">
      <p>Messages</p>
    </div>
  </div>

  <div className="Notifications">
    <div className="Notifications1">
      <i className="fa-regular fa-heart"></i>
    </div>
    <div className="Notifications2">
      <p>Notifications</p>
    </div>
  </div>
  <div className="Create">
    <div className="Create1">
      <i className="fa-regular fa-square-plus"></i>
    </div>
    <div className="Create2">
      <p onClick={() => router("/create-post")}>Create</p>
    </div>
  </div>
  <div className="Profile" onClick={() => router("/profile")}>
    <div className="Profile1">
      <i className="fa-regular fa-user"></i>
    </div>
    <div className="Profile2">
      <p>Profile</p>
    </div>
  </div>
  <div className="More">
    <div className="More1">
      <i className="fa-solid fa-bars"></i>
    </div>
    <div className="More2">
      <p>More</p>
    </div>
  </div>
  <div className="logout">
    <div className="logout1">
      <i className="fa-regular fa-user"></i>
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
            <div key={post._id} className="postimage">
              <div className="postHeader">
                <img className="profilePhoto" src={post.author.profilePhoto} alt={post.author.username} />
                <span className="username">{post.author.username}</span>
              </div>
              <img className="postimagesize" src={post.image} alt={post.caption} />
              <div className="postFooter">
                <div className="likeSection" onClick={() => handleLike(post._id)}>
                  <i className={`fa-regular fa-heart ${likedPosts[post._id] ? 'liked' : 'not-liked'}`}></i>
                  <span className="likesCount">{post.likes.length} likes</span>
                </div>
                <div className="caption">
                  <p className="caption1">{post.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="SuggestDiv">
        <div className="postHeaderrightside" onClick={() => router("/profile")}>
          <img className="profilePhoto" src={state?.user?.profilePhoto} alt={state?.user?.username} />
          <span className="usernameright">{state?.user?.username}</span>
        </div>
        <h1>Suggested for you</h1>
        {allUsers.length > 0 ? (
          <div className="suggestedUsersList">
            {allUsers.map((user) => (
              <div key={user._id} className="suggestedUser">
                <div className="profilePhoto placeholder">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="username">{user.username}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Popup for search results */}
      {isPopupVisible && (
        <div className="search-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={() => setIsPopupVisible(false)}>×</span>
            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="search-results">
                {searchResults.map(user => (
                  <div key={user._id} className="search-result-item">
                    <div className="profilePhoto placeholder">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span className="username">{user.username}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
