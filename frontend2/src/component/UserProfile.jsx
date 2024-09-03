import React, { useContext, useEffect, useState } from "react";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext); // Context to get the current user or other relevant information

  async function GetUserProfile() {
    setLoading(true);
    try {
      const response = await Api.get("/post/profile", {
        userId: state?.user?.userId,
      }); // Fetch user profile data from the backend
      if (response.data.success) {
        setLoading(false);
        setUserData(response.data); // Assuming the data structure includes user profile info and posts
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (state) {
      GetUserProfile(); // Fetch user profile data when component mounts
    }
  }, [state]);

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <div>
          <h1>Loading...</h1>
          {/* Optional placeholder for loading state */}
        </div>
      ) : (
        userData && (
          <div>
            <h2>{userData.name}</h2>
            <h3>@{state?.user?.username}</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {userData.posts && userData.posts.length > 0 ? (
                userData.posts.map((post) => (
                  <div
                    key={post._id}
                    style={{
                      width: "23%",
                      height: "350px",
                      border: "2px solid black",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      style={{ width: "80%", height: "70%" }}
                      src={post.image}
                      alt={post.caption}
                    />
                    <p>Caption: {post.caption}</p>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default UserProfile;
