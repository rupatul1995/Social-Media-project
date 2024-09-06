import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosConfig';
import '../style/userprofile.css';

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await Api.post('/auth/user-posts', {
          userId: state?.user?.userId,
        });
        if (response.data.success) {
          setUserPosts(response.data.posts);
          setFollowersCount(response.data.followersCount);
          setFollowingCount(response.data.followingCount);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [state]);

  const handleFollowToggle = async () => {
    try {
      const response = await Api.post(isFollowing ? `/auth/unfollow/${state?.user?.userId}` : `/auth/follow/${state?.user?.userId}`);
      if (response.data.success) {
        setIsFollowing(!isFollowing);
        setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
      } else {
        console.error('Failed to update follow status');
      }
    } catch (error) {
      console.error('Error updating follow status', error);
    }
  };

  return (
    <div className="userprofile">
      <div className="userprofiletop">
        <img className="user-profile-photo" src={state?.user?.profilePicture} alt="Profile" />
        <span className="user-profile-name">{state?.user?.username}</span>
        <div className="follow-info">
          <span>{followersCount} Followers</span>
          <span>{followingCount} Following</span>
        </div>
        <button onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
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
