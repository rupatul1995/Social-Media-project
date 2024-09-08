

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosConfig';
import '../style/userprofile.css';

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await Api.post('/auth/user-posts', {
          userId: state?.user?.userId,
        });
        if (response.data.success) {
          setUserPosts(response.data.posts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching user posts', error);
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchUserPosts();
    }
  }, [state]);

  return (
    <div className="userprofile">
      <div className="userprofiletop">
        <img className="user-profile-photo" src={state?.user?.profilePicture} alt="Profile" />
        <span className="user-profile-name"> {state?.user?.username}</span>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="userposts">
          {userPosts.map((post) => (
            <div key={post._id} className="post">
              <img src={post.image} alt={post.caption} className="post-image" />
          
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;







