import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosConfig';
import '../style/userprofile.css';

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [editingProfilePicture, setEditingProfilePicture] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userId = state?.user?.userId;
        if (!userId) return;

        const postsResponse = await Api.post('/auth/user-posts', { userId });
        if (postsResponse.data.success) {
          setUserPosts(postsResponse.data.posts);
        } else {
          console.error('Failed to fetch user posts');
        }

        const userResponse = await Api.post('/auth/get-user-profile', { userId });
        if (userResponse.data.success) {
          setBio(userResponse.data.bio);
          setProfilePicture(userResponse.data.profilePicture);
          setIsFollowing(userResponse.data.isFollowing);
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

  const handleBioChange = (e) => setBio(e.target.value);
  const handleProfilePictureChange = (e) => setProfilePicture(e.target.value);

  const handleBioSave = async () => {
    try {
      const response = await Api.post('/auth/update-bio', {
        userId: state?.user?.userId,
        bio,
      });
      if (response.data.success) {
        setEditingBio(false);
      } else {
        console.error('Failed to update bio');
      }
    } catch (error) {
      console.error('Error updating bio', error);
    }
  };

  const handleProfilePictureSave = async () => {
    try {
      const response = await Api.post('/auth/update-profile-picture', {
        userId: state?.user?.userId,
        profilePicture,
      });
      if (response.data.success) {
        setEditingProfilePicture(false);
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture', error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await Api.post('/auth/follow', {
        userId: state?.user?.userId,
        followUserId: state?.user?.userId,
      });
      if (response.data.success) {
        setIsFollowing(true);
      } else {
        console.error('Failed to follow user');
      }
    } catch (error) {
      console.error('Error following user', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await Api.post('/auth/unfollow', {
        userId: state?.user?.userId,
        unfollowUserId: state?.user?.userId,
      });
      if (response.data.success) {
        setIsFollowing(false);
      } else {
        console.error('Failed to unfollow user');
      }
    } catch (error) {
      console.error('Error unfollowing user', error);
    }
  };

  return (
    <div className="userprofile">
      <div className="userprofiletop">
        {editingProfilePicture ? (
          <div>
            <input
              type="text"
              value={profilePicture}
              onChange={handleProfilePictureChange}
              placeholder="Profile picture URL"
            />
            <button onClick={handleProfilePictureSave}>Save</button>
            <button onClick={() => setEditingProfilePicture(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <img
              className="user-profile-photo"
              src={profilePicture}
              alt="Profile"
            />
            {state?.user?.userId === state?.user?.userId && (
              <button onClick={() => setEditingProfilePicture(true)}>Edit Profile Picture</button>
            )}
          </div>
        )}
        <span className="user-profile-name">{state?.user?.username}</span>
      </div>
      <div className="user-bio">
        {editingBio ? (
          <div>
            <textarea value={bio} onChange={handleBioChange} />
            <button onClick={handleBioSave}>Save</button>
            <button onClick={() => setEditingBio(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>{bio || "No bio available"}</p>
            {state?.user?.userId === state?.user?.userId && (
              <button onClick={() => setEditingBio(true)}>Edit Bio</button>
            )}
          </div>
        )}
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
      {state?.user?.userId !== state?.user?.userId && (
        <button onClick={isFollowing ? handleUnfollow : handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
}

export default UserProfile;
